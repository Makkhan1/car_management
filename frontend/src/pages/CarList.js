import React, { useEffect, useState } from 'react';
import { getCars } from '../api/api';
import CarCard from '../components/CarCard';
import './CarList.css'; 

function CarList() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      const data = await getCars();
      setCars(data);
    };
    fetchCars();
  }, []);

  const filteredCars = cars.filter(car =>
    car.title.toLowerCase().includes(search.toLowerCase()) || 
    car.description.toLowerCase().includes(search.toLowerCase())
  );
  

  return (
    <div className="car-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search cars..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="car-card-list">
        {filteredCars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
}

export default CarList;
