<<<<<<< HEAD
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';  // ADD THIS LINE
=======
import Header from './components/Header';
import SignUpForm from './components/SignUpForm';
>>>>>>> db91d7609ab7b98d57181c988e79c2fe9dee37c8
import './App.css';

function App() {
  return (
<<<<<<< HEAD
    <BrowserRouter>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/signup" />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
=======
    <div className="app">
      <Header />
      <main>
        <SignUpForm />
      </main>
    </div>
>>>>>>> db91d7609ab7b98d57181c988e79c2fe9dee37c8
  );
}

export default App;