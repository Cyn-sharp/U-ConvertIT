import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
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
      </nav>
    </header>
  );
}

export default Header;