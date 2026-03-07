import jwt from 'jsonwebtoken';

// Verify Clerk JWT token for job seekers
export const verifyClerkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No authorization token provided'
      });
    }

    // Verify the token with Clerk
    const decoded = jwt.decode(token);
    
    if (!decoded || !decoded.sub) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    // Attach user ID to request
    req.userId = decoded.sub;
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error('Clerk token verification error:', error);
    return res.status(401).json({
      success: false,
      message: 'Authentication failed',
      error: error.message
    });
  }
};

// Verify company JWT token
export const verifyCompanyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No authorization token provided'
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    // Attach company ID to request
    req.companyId = decoded.id;
    req.company = decoded;
    
    next();
  } catch (error) {
    console.error('Company token verification error:', error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired',
        error: error.message
      });
    }
    
    return res.status(401).json({
      success: false,
      message: 'Authentication failed',
      error: error.message
    });
  }
};

// Combined middleware that can handle both Clerk and Company tokens
export const verifyAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No authorization token provided'
    });
  }

  try {
    // Try to decode and check token type
    const decoded = jwt.decode(token);
    
    // If token has 'sub' field, it's likely a Clerk token
    if (decoded && decoded.sub) {
      return verifyClerkToken(req, res, next);
    } else {
      return verifyCompanyToken(req, res, next);
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Authentication failed',
      error: error.message
    });
  }
};
