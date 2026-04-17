<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
>>>>>>> db91d7609ab7b98d57181c988e79c2fe9dee37c8
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
<<<<<<< HEAD
        <img src="/logo.png" alt="U-ConvertIT Logo" width={65} height={65} />
        <span className="brand-name">U-ConvertIT</span>
      </div>
      <nav className="header-nav">
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/signup" className="nav-button">Sign Up</Link>
=======
        <img 
          src="/logo.png" 
          alt="U-ConvertIT Logo" 
          width={65} 
          height={65}
        />
        <span className="brand-name">U-ConvertIT</span>
      </div>
      <nav className="header-nav">
        <a href="/login" className="nav-link">Login</a>
        <a href="/signup" className="nav-button">Sign Up</a>
>>>>>>> db91d7609ab7b98d57181c988e79c2fe9dee37c8
      </nav>
    </header>
  );
}

export default Header;