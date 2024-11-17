const Car = require('../models/Car');
const upload = require('../config/config');

const cloudinary = require('../config/cloudinary'); 



exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find({ owner: req.user.userId });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cars' });
  }
};

exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching car' });
  }
};


exports.createCar = async (req, res) => {
  try {
    const { title, description , tags} = req.body;

 
    const imageUrls = [];
    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'car_management', 
        });
        imageUrls.push(result.secure_url);
      }
    }

    const car = new Car({
      title,
      description,
      images: imageUrls,
      tags ,
      owner: req.user.userId,
    });

    await car.save();
    res.status(201).json(car);
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ message: 'Error creating car' });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const { title, description , tags } = req.body;
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    if (car.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

   
    const newImageUrls = [];
    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'car_management', 
        });
        newImageUrls.push(result.secure_url);
      }
    }


    car.title = title || car.title;
    car.description = description || car.description;
    car.images = [...car.images, ...newImageUrls]; 
    car.tags =  tags || car.tags ;

    await car.save();
    res.json(car);
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ message: 'Error updating car' });
  }
};



exports.deleteCar = async (req, res) => {
  try {
    

    const car = await Car.findById(req.params.id);

   
    if (!car) return res.status(404).json({ message: 'Car not found' });

    
    console.log("inside the deleteCar controller!!!" , car);
    
    if (car.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
     
    const carId = (car._id).toString() ;
    console.log("car ki id : " , carId);
    

    await Car.findByIdAndDelete(carId);
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting car' });
  }
};
