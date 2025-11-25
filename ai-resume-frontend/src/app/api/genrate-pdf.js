// pages/api/generate-pdf.js
import { renderToStaticMarkup } from "react-dom/server";
import puppeteer from "puppeteer";
import React from "react";
// import the server-renderable template(s)
import Template1 from "../../components/templates/Template1";
import Template2 from "../../components/templates/Template3";
import Template3 from "../../components/templates/Template4";
// adjust imports to match your files/structure

export default async function handler(req, res) {
  try {
    const { data = {}, templateIndex = 0 } = req.body;

    const templates = [Template1, Template2, Template3];
    const SelectedTemplate = templates[templateIndex] || templates[0];

    // render the component to HTML string
    const elementHtml = renderToStaticMarkup(
      React.createElement(SelectedTemplate, { data })
    );

    // full HTML page with Tailwind CDN (quick). For production you should inline critical CSS.
    const fullHtml = `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width,initial-scale=1"/>
          <!-- Tailwind CDN (good for quick start) -->
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>
            /* ensure page size neutral styles if needed */
            html,body { margin:0; padding:0; background: white; }
          </style>
        </head>
        <body>
          <div id="root">${elementHtml}</div>
        </body>
      </html>`;

    // launch puppeteer and create PDF (headless)
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(fullHtml, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "10mm", right: "10mm", bottom: "10mm", left: "10mm" },
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");
    res.status(200).send(pdf);
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({ error: err.message || "PDF failed" });
  }
}
