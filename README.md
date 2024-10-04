# Quiz Builder App

Welcome to the **Quiz Builder App** — a full-stack application built using the **MERN** (MongoDB, Express.js, React.js, Node.js) stack. This application allows users to create, share, and take quizzes seamlessly. The platform is designed with both creators and participants in mind, offering an intuitive interface for creating quizzes and a responsive experience for quiz takers.

## Features

### For Quiz Creators:
- **Create Quizzes**: Easily create and customize quizzes with a simple form interface.
- **Form Validation**: Ensures accurate and complete input with field validations and toast notifications.
- **Share Quizzes**: Generate shareable links for quizzes that can be taken by anyone, even without an account.
- **Edit Quizzes**: Update existing quizzes by fetching questions from the server and making changes.
- **Authentication**: Secure login system for quiz creators to manage their quizzes.

### For Quiz Takers:
- **Responsive Design**: The quiz-taking interface is optimized for mobile devices, ensuring a smooth experience on phones and tablets.
- **No Login Required**: Anyone can take a quiz without needing to create an account.
- **Track Your Score**: The app logs the number of correct answers, giving immediate feedback on performance.

### Additional Features:
- **Pagination for Quizzes**: Supports navigation through quiz questions with "Next" and "Submit" buttons.
- **Real-time Feedback**: Visual feedback on form completion and quiz submission.
- **Responsive Design**: The quiz-taking section is fully responsive, while the quiz builder is designed for larger screens.

## Tech Stack

### Frontend:
- **React.js**: A component-based library for building interactive UIs.
- **CSS**: Styled for clean and responsive user interfaces.
- **Toast Notifications**: Provides feedback to users in real-time.

### Backend:
- **Node.js**: A JavaScript runtime environment for building the server-side logic.
- **Express.js**: A lightweight framework for handling routing and HTTP requests.
- **MongoDB**: A NoSQL database for storing quiz data and user information.

### Tools and Libraries:
- **Mongoose**: For modeling the MongoDB data structure.
- **Axios**: For handling API requests between frontend and backend.
- **JWT**: Secure authentication using JSON Web Tokens.

## Installation

To run this project locally, follow these steps:

### Prerequisites:
- **Node.js**: Ensure that Node.js is installed on your machine.
- **MongoDB**: Make sure MongoDB is running locally or use MongoDB Atlas for a cloud solution.

### Clone the Repository:
```bash
git clone https://github.com/yourusername/quiz-builder-app.git
cd quiz-builder-app

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
# Start backend
cd backend
npm run dev

# Start frontend
cd ../frontend
npm start
.
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── utils
│   └── server.js
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── utils
│   └── App.js
└── README.md

