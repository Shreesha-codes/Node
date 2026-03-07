// Authentication utility functions

// Company Authentication
export const getCompanyToken = () => {
  return localStorage.getItem('companyToken');
};

export const getCompanyData = () => {
  const data = localStorage.getItem('companyData');
  return data ? JSON.parse(data) : null;
};

export const isCompanyAuthenticated = () => {
  return !!getCompanyToken();
};

export const setCompanyAuth = (token, companyData) => {
  localStorage.setItem('companyToken', token);
  localStorage.setItem('companyData', JSON.stringify(companyData));
};

export const clearCompanyAuth = () => {
  localStorage.removeItem('companyToken');
  localStorage.removeItem('companyData');
};

// Clerk User Authentication
export const getClerkToken = async (getToken) => {
  try {
    const token = await getToken();
    return token;
  } catch (error) {
    console.error('Error getting Clerk token:', error);
    return null;
  }
};

export const isUserAuthenticated = (isSignedIn) => {
  return !!isSignedIn;
};
