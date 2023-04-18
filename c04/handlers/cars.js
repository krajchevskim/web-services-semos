const {
    addCar,
    removeCar,
    updateCar,
    getAllCars,
    getCarByIndex,
    getOneCar
} = require('../pkg/cars/mongo');

// source of data => cars manipulation => handlers for cars =>  /api/cars

const getAll = async (req, res) => {
    try {
        const cars = await getAllCars();
        return res.status(200).send(cars);

    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};

const getOne = async (req, res) => {   // vo eden req imame req.params(toa so go davame kako index //cars/:id- dinamicen podatok); req.query(//cars/:id?month=10 ova e query); req.body; req.headers mozebi; 
    // cars/:id?month=10  <-- ovde :id e params, a ?month=10 e query
    try{
        const car = await getOneCar(Number(req.params.id));
        return res.status(200).send(car);
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};

const create = async (req, res) => {
    try {
        // {
        //     "manufacturer":
        //     "model":
        //     "year":
        // }   
        await addCar(req.body);
        return res.status(201).send(req.body);                  //  Success and created resource
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};

const update = async (req, res) => {
    try{
        await updateCar(Number(req.params.id, req.body));
        return res.status(204).send('');                          // Success but no entity body - updating existing car
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};

const remove = async (req, res) => {
    try {
        await removeCar(Number(req.params.id));
        return res.status(204).send('');
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
};