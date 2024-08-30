import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Quizzz from "./Pages/Quizzz";
import QuizComplete from "./Pages/QuizComplete";
import Analytics from "./Pages/Analytics";
import PollCompleted from "./Pages/PollCompleted";
import EditQuiz from "./Pages/EditQuiz";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quizz/:quizzID" element={<Quizzz />} />
        <Route path="/completed" element={<QuizComplete />} />
        <Route path="/pollCompleted" element={<PollCompleted />} />
        <Route path="/edit-quiz/:quizID" element={<EditQuiz />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
