// API Service for Backend Integration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Job APIs
export const jobAPI = {
  // Get all jobs with optional filters
  getAllJobs: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.title) queryParams.append('title', filters.title);
    if (filters.location) queryParams.append('location', filters.location);
    if (filters.category) queryParams.append('category', filters.category);
    
    const endpoint = `/jobs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiRequest(endpoint);
  },

  // Get single job by ID
  getJobById: async (id) => {
    return apiRequest(`/jobs/${id}`);
  },

  // Get jobs by company
  getJobsByCompany: async (companyId) => {
    return apiRequest(`/jobs/company/${companyId}`);
  },

  // Create new job (requires company token)
  createJob: async (jobData, token) => {
    return apiRequest('/jobs', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(jobData),
    });
  },

  // Update job (requires company token)
  updateJob: async (id, jobData, token) => {
    return apiRequest(`/jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(jobData),
    });
  },

  // Delete job (requires company token)
  deleteJob: async (id, token) => {
    return apiRequest(`/jobs/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};

// Company APIs
export const companyAPI = {
  // Register company
  register: async (companyData) => {
    return apiRequest('/company/register', {
      method: 'POST',
      body: JSON.stringify(companyData),
    });
  },

  // Login company
  login: async (credentials) => {
    return apiRequest('/company/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Get company profile
  getProfile: async (token) => {
    return apiRequest('/company/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Update company profile
  updateProfile: async (profileData, token) => {
    return apiRequest('/company/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
  },

  // Get company dashboard
  getDashboard: async (token) => {
    return apiRequest('/company/dashboard', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Get company's jobs
  getManageJobs: async (token) => {
    return apiRequest('/company/manage-jobs', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};

// Application APIs
export const applicationAPI = {
  // Submit application (with resume file)
  submitApplication: async (formData) => {
    try {
      const response = await fetch(`${API_URL}/applications`, {
        method: 'POST',
        body: formData, // FormData handles multipart/form-data
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit application');
      }

      return data;
    } catch (error) {
      console.error('Application submission error:', error);
      throw error;
    }
  },

  // Get user's applications
  getUserApplications: async (userId, clerkToken) => {
    return apiRequest(`/applications/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${clerkToken}`,
      },
    });
  },

  // Get applications for a job (company)
  getJobApplications: async (jobId, companyToken) => {
    return apiRequest(`/applications/job/${jobId}`, {
      headers: {
        'Authorization': `Bearer ${companyToken}`,
      },
    });
  },

  // Get single application
  getApplicationById: async (id) => {
    return apiRequest(`/applications/${id}`);
  },

  // Update application status (company)
  updateStatus: async (id, status, companyToken) => {
    return apiRequest(`/applications/${id}/status`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${companyToken}`,
      },
      body: JSON.stringify({ status }),
    });
  },

  // Delete application
  deleteApplication: async (id) => {
    return apiRequest(`/applications/${id}`, {
      method: 'DELETE',
    });
  },
};

// User APIs
export const userAPI = {
  // Get user profile
  getProfile: async (clerkToken) => {
    return apiRequest('/users/profile', {
      headers: {
        'Authorization': `Bearer ${clerkToken}`,
      },
    });
  },

  // Update user profile
  updateProfile: async (profileData, clerkToken) => {
    return apiRequest('/users/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${clerkToken}`,
      },
      body: JSON.stringify(profileData),
    });
  },

  // Upload resume
  uploadResume: async (formData, clerkToken) => {
    try {
      const response = await fetch(`${API_URL}/users/resume`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${clerkToken}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload resume');
      }

      return data;
    } catch (error) {
      console.error('Resume upload error:', error);
      throw error;
    }
  },
};

export default {
  jobAPI,
  companyAPI,
  applicationAPI,
  userAPI,
};
