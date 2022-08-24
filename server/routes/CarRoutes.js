const { Router } = require('express');
const router = Router();

const Car = require('../controllers/carController')

router.get('/getCars', Car.getCars); 
router.get('/getBy/:filter/:id', Car.getBy); 
router.post('/newCar', Car.newCar); 
router.delete('/:id', Car.DeleteCar);
router.put('/setCar', Car.setCar);

module.exports = router;