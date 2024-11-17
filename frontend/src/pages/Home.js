import React from 'react';

import './Home.css';

export const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to the Car Management Page</h1>
        <p>Simplify your car management with our platform. Track services, expenses, and more!</p>
       
      </header>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="features-list">
          <div className="feature-item">
            <h3>Service Tracker</h3>
            <p>Keep a log of all your car services in one place.</p>
          </div>
          <div className="feature-item">
            <h3>Expense Management</h3>
            <p>Monitor your car-related expenses effortlessly.</p>
          </div>
          <div className="feature-item">
            <h3>Maintenance Reminders</h3>
            <p>Never miss a service date with automatic reminders.</p>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} Car Management. All rights reserved.</p>
      </footer>
    </div>
  );
};
