# AI-Resume-builder

AI Resume Builder is a project I'm passionate about. It creates a resume according to the user's needs like job and experience. Small inputs from the user create a big difference in the resume, which is all a builder needs!

## Features

- AI-powered resume generation based on user inputs
- Customizable templates for different job types and experiences
- Modern, responsive design with Tailwind CSS
- PDF export functionality for professional sharing
- Next.js frontend with Express.js backend API

## Tech Stack

**Frontend:**
- Next.js 14.2.3
- React 18.2.0
- Tailwind CSS 3.4.1
- HTML2Canvas & jsPDF for PDF generation

**Backend:**
- Express.js 4.18.2
- Node.js with ES modules
- Axios for API calls
- CORS for cross-origin requests

## Installation

### Backend Setup

bash
cd server
npm install


### Frontend Setup

bash
cd ai-resume-frontend
npm install


## Usage

### Running the Backend

bash
cd server
npm run dev


### Running the Frontend

bash
cd ai-resume-frontend
npm run dev


The application will be available at `http://localhost:3000`.

## Project Structure


ai-resume-builder/
├── server/
│   ├── src/
│   │   ├── controllers/          # API controllers
│   │   ├── routes/              # API route definitions
│   │   ├── services/            # AI service logic
│   │   └── app.js              # Express app configuration
│   ├── server.js               # Main server entry point
│   └── package.json           # Backend dependencies
└── ai-resume-frontend/
    ├── src/
    │   ├── app/                # Next.js app directory
    │   ├── components/         # React components
    │   └── pages/             # Page components
    ├── next.config.mjs        # Next.js configuration
    ├── tailwind.config.js     # Tailwind CSS configuration
    └── package.json          # Frontend dependencies


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project does not specify a license.