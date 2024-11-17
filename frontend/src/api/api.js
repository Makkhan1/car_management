import axios from 'axios';


const url = "https://car-management-1-cskg.onrender.com"

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || `${url}/api`,
});






export const signup = async (userData) => {
  try {
    const response = await API.post(`${url}/api/auth/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error signing up';
  }
};

export const login = async (userData) => {
  try {
    console.log("login ka function call hua :");
    
    const response = await API.post(`${url}/api/auth/login`, userData);

    console.log('login ke baad wala response : ' , response.data.token);

    const token = response.data.token ;
    localStorage.setItem( 'token' ,  token);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error logging in';
  }
};


export const getCars = async () => {
  try {
    
    

const token = localStorage.getItem('token');
console.log('token in getCars : ' , token) ;


  
    if (!token) {
      throw new Error('Token is missing');
    }


    const response = await API.get(`${url}/api/cars`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    console.log("car ka complete data : ", response) ;

    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error fetching cars';
  }
};


export const getCarById = async (carId) => {
  try {
    

const token = localStorage.getItem('token');
console.log('token in getCars : ' , token) ;


    const response = await API.get(`${url}/api/cars/${carId}` , {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error fetching car details';
  }
};

export const createCar = async (carData) => {
  try {
   

const token = localStorage.getItem('token');
console.log('token in getCars : ' , token) ;


    const response = await API.post(`${url}/api/cars`, carData , {
      headers: {
        authorization: `Bearer ${token}`,
      },
    } );
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error creating car';
  }
};

export const updateCar = async (carId, carData) => {
  try {
    

const token = localStorage.getItem('token');
console.log('token in getCars : ' , token) ;


    const response = await API.put(`${url}/api/cars/${carId}` , carData , {
      headers: {
        authorization: `Bearer ${token}`,
      },
    } );
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error updating car';
  }
};

export const deleteCar = async (carId) => {
  try {
    

const token = localStorage.getItem('token');
console.log('token in getCars : ' , token) ;


    const response = await API.delete(`${url}/api/cars/${carId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error deleting car';
  }
};

export default API;
