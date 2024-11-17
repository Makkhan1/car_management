import React, { useState, useEffect } from 'react';
import { getCarById, deleteCar } from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';
import './CarDetail.css';

function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      const data = await getCarById(id);
      setCar(data);
    };
    fetchCar();
  }, []);

  const handleDelete = async () => {
    await deleteCar(id);
    navigate('/cars');
  };

  return car ? (
    <div className="car-detail-container">
      <div className="car-detail-header">
        <div className="image-container">
          {car.images.map((url, index) => (
            <img key={index} src={url} alt="Car Image" className="car-image" />
          ))}
        </div>
        <h2 className="car-title">{car.title}</h2>

        <h2 className="section-title">Car Description</h2>
        <p className="car-description">{car.description}</p>

        <h3 className="section-title">Tags:</h3>
        <div className="tags-display">
          {car.tags && car.tags.length > 0 ? (
            car.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))
          ) : (
            <p className="no-tags">No tags available</p>
          )}
        </div>
      </div>

      <div className="car-detail-actions">
        <button onClick={() => navigate(`/cars/edit/${id}`)} className="edit-btn">
          Edit
        </button>
        <button onClick={handleDelete} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  ) : (
    <p className="loading">Loading...</p>
  );
}

export default CarDetail;
