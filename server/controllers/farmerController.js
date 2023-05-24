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


  

    module.exports = {
        getAllFarmers
    }