const errorHandler = (err, req, res, next) => {
    console.log(error.stack);

    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
      }


    return res.status(500).json({ error: 'Internal Server Error' });
    };