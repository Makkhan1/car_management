import React from 'react';
import { Link } from 'react-router-dom';
import './CarCard.css';

function CarCard({ car }) {
  return (
    <div className="car-card">
      <img
        src={car.images[0] || 'https://via.placeholder.com/150'}
        alt="Car"
        className="car-card-image"
      />
      <div className="car-card-content">
        <h3 className="car-card-title">{car.title}</h3>
        <p className="car-card-description">{car.description}</p>

        <div className="car-tags">
          {car.tags && car.tags.length > 0 ? (
            car.tags.map((tag, index) => (
              <span key={index} className="car-tag">{tag}</span>
            ))
          ) : (
            <span className="no-tags">No tags available</span>
          )}
        </div>

        <Link to={`/cars/${car._id}`} className="car-card-link">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default CarCard;
