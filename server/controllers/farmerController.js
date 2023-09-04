const User = require('../models/userModel');

const getAllFarmers = async (req, res) => {
  try {
    const farmers = await User.find({ role: 'farmer' });
    res.json(farmers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createFarmer = async (req, res) => {
  try {
    const { location, age, email, name, password,phone } = req.body;

    const farmer = new Farmer({
      password,
      phone,
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


const getFarmerById = async (req, res) => {
  try {
    const farmers = await User.findById(req.params.id);
    res.status(200).json(farmers);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
}
};

//updating farmer by ID
const updateFarmer = async (req, res) => {
  try {
    const farmerId = req.params.id; // Get the farmer ID from the request parameters

    const farmer = await Farmer.findByIdAndUpdate(farmerId, req.body, {
      new: true,
    });

    if (!farmer) {
      return res.status(404).json({ error: 'Farmer not found' });
    }

    res.json(farmer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a farmer by ID
const deleteFarmer = async (req, res) => {
  try {
    const farmer = await Farmer.findByIdAndDelete(req.params.id);
    if (!farmer) {
      return res.status(404).json({ error: 'Farmer not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = {
  getAllFarmers,
  createFarmer,
  getFarmerById,
  updateFarmer,
  deleteFarmer
}




/*const Farmer = require('../models/farmerModel');

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
      const { location, age, email, name, password,phone } = req.body;
  
      const farmer = new Farmer({
        password,
        phone,
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

  // Get a single farmer by ID
const getFarmerById = async (req, res) => {
    try {
      const farmer = await Farmer.findById(req.params.id);
      if (!farmer) {
        return res.status(404).json({ error: 'Farmer not found' });
      }
      res.json(farmer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
//updating farmer by ID
  const updateFarmer = async (req, res) => {
    try {
      const farmerId = req.params.id; // Get the farmer ID from the request parameters
  
      const farmer = await Farmer.findByIdAndUpdate(farmerId, req.body, {
        new: true,
      });
  
      if (!farmer) {
        return res.status(404).json({ error: 'Farmer not found' });
      }
  
      res.json(farmer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Delete a farmer by ID
const deleteFarmer = async (req, res) => {
    try {
      const farmer = await Farmer.findByIdAndDelete(req.params.id);
      if (!farmer) {
        return res.status(404).json({ error: 'Farmer not found' });
      }
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };




    module.exports = {
        getAllFarmers,
        createFarmer,
        getFarmerById,
        updateFarmer,
        deleteFarmer
    }*/