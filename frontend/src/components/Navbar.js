import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <h1 style={styles.brandName}>Car Management</h1>
      </div>
      <div style={styles.linksContainer}>
        <Link to="/" style={styles.link}>Home</Link>
        {token ? (
          <>
            <Link to="/cars" style={styles.link}>My Cars</Link>
            <Link to="/cars/create" style={styles.link}>Add Car</Link>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    background: 'linear-gradient(135deg, #1f1f1f, #333)',  
    color: '#fff',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: '26px',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  brandName: {
    color: '#ff8c00',  
    textTransform: 'uppercase',
    margin: 0,
  },
  linksContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    margin: '0 15px',
    fontSize: '16px',
    padding: '8px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  linkHover: {
    backgroundColor: '#ff8c00',  
    transform: 'scale(1.1)',
  },
  logoutButton: {
    backgroundColor: '#ff4b5c',
    color: '#fff',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginLeft: '20px',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  logoutButtonHover: {
    backgroundColor: '#e63649',  
    transform: 'scale(1.05)',
  },
};


styles.link = {
  ...styles.link,
  ':hover': styles.linkHover, 
};

styles.logoutButton = {
  ...styles.logoutButton,
  ':hover': styles.logoutButtonHover, 
};

export default Navbar;
