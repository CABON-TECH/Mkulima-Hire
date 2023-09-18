const Job = require('../models/jobModel');
const Worker = require('../models/workerModel');
const io = require('../webSocketServer/webSocketServer.js');



const getAllJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find();
        res.status(200).json({
            success: true,
            data: jobs
        });
    } catch (err) {
        next(err);
    }
};

//create a job
const createJob = async (req, res, next) => {
    try {
        const job = await Job.create(req.body);
        res.status(201).json({
            success: true,
            data: job
        });
    } catch (err) {
        next(err);
    }
};

// get a job by id
const getJobById = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: job
        });
    } catch (err) {
        next(err);
    }
};
const applicationSubmission = async (req, res) => {
    try {
      const userId = req.userId;
      
      // Extract job application data from the request body
      const { name, contactInfo, experience, /*userId*/ } = req.body;
  
      // Find the job by jobId
      const job = await Job.findById(req.params.jobId);
  
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
      //const workerUserId = req.user._id;
  
      // Add the job application to the job's applications array
      job.applications.push({ name, contactInfo, experience, userId  });
  
      // Save the updated job
      await job.save();
  
      // Return a success response
      res.status(201).json({ message: 'Job application submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  const applications = async (req, res) => {
    try {
      // Get the jobId from the request parameters
      const { jobId } = req.params;
  
      // Find the job listing by jobId
      const job = await Job.findById(jobId).populate('applications.user');
  
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }

  
      // Retrieve the applications associated with the job listing
      const applications = job.applications;

      //const workerDetails = await Worker.find({ userId: { $in: applications.map(app => app.userId) } });
  
      res.status(200).json({
        success: true,
        data: { applications},
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  /*const applicationSubmission = async (req, res) => {
    try {
      // Extract job application data from the request body
      const { name, contactInfo, experience } = req.body;
  
      // Find the job by jobId
      const job = await Job.findById(req.params.jobId);
  
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
      // Create a job application document with worker details
      const jobApplication = {
        worker: req.user._id, // Assuming you have authenticated workers
        workerName: name,
        contactInfo: contactInfo,
        experience: experience,
      };
  
      // Add the job application to the job's applications array
      job.applications.push(jobApplication);
  
      // Save the updated job
      await job.save();
  
      // Return a success response
      res.status(201).json({ message: 'Job application submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };*/

  //application approval
  const approve = async (req, res) => {
    try {
      const { jobId, applicationId } = req.params;
      
      // Find the job listing by jobId
      const job = await Job.findById(jobId);
  
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
      // Find the application by applicationId
      const application = job.applications.id(applicationId);
  
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
  
      // Set the status to 'approved'
      application.status = 'approved';
  
      // Save the updated job listing
      await job.save();

      //emitting an event to the worker with the updated status
      io.to(workerSocketId).emit('applicationStatusChange',{
        applicationId,
        newStatus: 'approved',
      });
  
      // Return a success response
      res.status(200).json({ message: 'Application approved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  //reject
  const reject = async (req, res) => {
    try {
      const { jobId, applicationId } = req.params;
      
      // Find the job listing by jobId
      const job = await Job.findById(jobId);
  
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
      // Find the application by applicationId
      const application = job.applications.id(applicationId);
  
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
  
      // Set the status to 'rejected'
      application.status = 'rejected';
  
      // Save the updated job listing
      await job.save();

      //emit an event to the worker with updated status
      io.to(workerSocketid).emit('applicationStatusChange', {
        applicationId,
        newStatus: 'rejected',
      });
  
      // Return a success response
      res.status(200).json({ message: 'Application rejected successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

// update a job by id
const updateJobById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {title, description, city, state, phone, email, pay} = req.body;

        const updatedJob = await Job.findByIdAndUpdate(id, {title, description, city, state, phone, email, pay}, {new: true});

        if (!updatedJob) {
            return next(new ErrorResponse('Job not found', 404));
        }

        res.status(200).json({
            success: true,
            data: updatedJob
        });
    } catch (err) {
        next(err);
    }
};

// delete a job by id
const deleteJobById = async (req, res, next) => {
    try {
        const {id} = req.params;

        const deletedJob = await Job.findByIdAndDelete(id);

        if (!deletedJob) {
            return next(new ErrorResponse('Job not found', 404));
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        next(err);
    }
};




module.exports = {
    getAllJobs,
    createJob,
    getJobById,
    applicationSubmission,
    applications,
    approve,
    reject,
    updateJobById,
    deleteJobById
};


