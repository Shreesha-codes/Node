import Company from '../models/Company.model.js';
import Job from '../models/Job.model.js';
import Application from '../models/Application.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register new company
export const registerCompany = async (req, res) => {
  try {
    const { name, email, password, location, description } = req.body;

    // Check if company already exists
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: 'Company with this email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new company
    const company = await Company.create({
      name,
      email,
      password: hashedPassword,
      location,
      description
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: company._id, email: company.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Company registered successfully',
      data: {
        company: {
          id: company._id,
          name: company.name,
          email: company.email,
          location: company.location,
          description: company.description
        },
        token
      }
    });
  } catch (error) {
    console.error('Register company error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register company',
      error: error.message
    });
  }
};

// Company login
export const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find company
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, company.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: company._id, email: company.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        company: {
          id: company._id,
          name: company.name,
          email: company.email,
          location: company.location,
          description: company.description,
          image: company.image
        },
        token
      }
    });
  } catch (error) {
    console.error('Login company error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to login',
      error: error.message
    });
  }
};

// Get company profile
export const getCompanyProfile = async (req, res) => {
  try {
    const company = await Company.findById(req.companyId).select('-password');

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.json({
      success: true,
      data: company
    });
  } catch (error) {
    console.error('Get company profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch company profile',
      error: error.message
    });
  }
};

// Update company profile
export const updateCompanyProfile = async (req, res) => {
  try {
    const { name, location, description, image } = req.body;

    const company = await Company.findByIdAndUpdate(
      req.companyId,
      { name, location, description, image },
      { new: true, runValidators: true }
    ).select('-password');

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: company
    });
  } catch (error) {
    console.error('Update company profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
};

// Get company dashboard stats
export const getCompanyDashboard = async (req, res) => {
  try {
    const companyId = req.companyId;

    // Get total jobs posted by company
    const totalJobs = await Job.countDocuments({ companyId, visible: true });

    // Get total applicants across all jobs
    const jobs = await Job.find({ companyId, visible: true });
    const totalApplicants = jobs.reduce((sum, job) => sum + job.applicants, 0);

    // Get recent applications (last 5)
    const recentApplications = await Application.find({ companyId })
      .populate('jobId', 'title')
      .sort({ appliedDate: -1 })
      .limit(5);

    // Calculate average applicants per job
    const avgApplicants = totalJobs > 0 ? Math.round(totalApplicants / totalJobs) : 0;

    res.json({
      success: true,
      data: {
        totalJobs,
        totalApplicants,
        avgApplicants,
        activeJobs: totalJobs,
        recentApplications
      }
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data',
      error: error.message
    });
  }
};

// Get all company jobs with applicant count
export const getCompanyManageJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ companyId: req.companyId, visible: true })
      .sort({ date: -1 });

    res.json({
      success: true,
      data: jobs
    });
  } catch (error) {
    console.error('Get manage jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch jobs',
      error: error.message
    });
  }
};
