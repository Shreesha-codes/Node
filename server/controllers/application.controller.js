import Application from '../models/Application.model.js';
import Job from '../models/Job.model.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

// Submit job application
export const submitApplication = async (req, res) => {
  try {
    const { jobId, userId, companyId, name, email, coverLetter, imgSrc } = req.body;

    // Check if application already exists
    const existingApplication = await Application.findOne({ userId, jobId });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job'
      });
    }

    // Upload resume to Cloudinary if file provided
    let resumeUrl = '';
    if (req.file) {
      const result = await uploadToCloudinary(req.file, 'resumes');
      resumeUrl = result.url;
    }

    // Create application
    const application = await Application.create({
      jobId,
      userId,
      companyId,
      name,
      email,
      resume: resumeUrl,
      coverLetter,
      imgSrc
    });

    // Increment job applicants count
    await Job.findByIdAndUpdate(jobId, { $inc: { applicants: 1 } });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application
    });
  } catch (error) {
    console.error('Submit application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application',
      error: error.message
    });
  }
};

// Get user's applications
export const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.params.userId })
      .populate('jobId', 'title location salary')
      .populate('companyId', 'name image')
      .sort({ appliedDate: -1 });

    res.json({
      success: true,
      data: applications
    });
  } catch (error) {
    console.error('Get user applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications',
      error: error.message
    });
  }
};

// Get applications for a specific job
export const getJobApplications = async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId })
      .populate('jobId', 'title')
      .sort({ appliedDate: -1 });

    res.json({
      success: true,
      data: applications
    });
  } catch (error) {
    console.error('Get job applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications',
      error: error.message
    });
  }
};

// Get single application by ID
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('jobId', 'title description location salary')
      .populate('companyId', 'name image location');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      data: application
    });
  } catch (error) {
    console.error('Get application by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch application',
      error: error.message
    });
  }
};

// Update application status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['Pending', 'Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Check if company owns this job
    if (application.companyId.toString() !== req.companyId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this application'
      });
    }

    application.status = status;
    await application.save();

    res.json({
      success: true,
      message: 'Application status updated successfully',
      data: application
    });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update application status',
      error: error.message
    });
  }
};

// Delete application
export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Decrement job applicants count
    await Job.findByIdAndUpdate(application.jobId, { $inc: { applicants: -1 } });

    res.json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete application',
      error: error.message
    });
  }
};
