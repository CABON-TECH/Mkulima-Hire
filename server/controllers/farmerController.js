const Farmer = require('../models/farmerModel');

const getAllFarmers = async (req, res) => {
    try {
      const farmers = await Farmer.find();
      res.json(farmers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Create a new farmer
  const createFarmer = async (req, res) => {
    try {
      const { location, age, email, name } = req.body;
  
      const farmer = new Farmer({
        location,
        age,
        email,
        name
      });
  
      await farmer.save();
  
      res.json(farmer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };




    module.exports = {
        getAllFarmers,
        createFarmer,
    }