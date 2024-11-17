const express = require('express');
const {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} = require('../controllers/carController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();
const upload = require('../config/config')

router.get('/', authMiddleware, getCars); 
router.get('/:id', authMiddleware, getCarById); 
router.post('/', upload.array('images', 5) , authMiddleware, createCar);
router.put('/:id', upload.array('images', 5) , authMiddleware, updateCar); 
router.delete('/:id', authMiddleware, deleteCar);  

module.exports = router;
