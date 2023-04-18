const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    model: String,
    manufacturer: String,
    year: Number,
    color: String,
});

const Car = mongoose.model('cars', carSchema);

// add car

const addCar = async (car) => {
    try {

        const newCar = new Car(car);
        return await newCar.save();
        // ObjectId => unique id
    } catch(err) {
        throw err;
    }
};




//remove car

const removeCar = async (id) => {
    try{
        return await Car.deleteOne({ _id: id });
    } catch(err) {
        throw err;
    }
};




//update car

const updateCar = async (id, car) => {
    try{
        const newUpdate = await Car.updateOne({ _id: id, car });
    } catch(err) {
        throw err;
    }
};



//get all cars

const getAllCars = async () => {
    try{
        return await Car.find({});
    } catch(err) {
        throw err;
    }
};



// get one car

const getOneCar = async (id) => {
    try{
        return await Car.findOne({ _id: id });
    } catch(err) {
        throw err;
    }
};

module.exports = {
    addCar,
    removeCar,
    updateCar,
    getOneCar,
    getAllCars,
};