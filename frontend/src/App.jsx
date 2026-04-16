import Header from './components/Header';
import SignUpForm from './components/SignUpForm';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <SignUpForm />
      </main>
    </div>
  );
}

export default App;