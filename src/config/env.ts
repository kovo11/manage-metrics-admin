
// Configuration values from environment variables
const env = {
  // API BASE URL
  API_URL: import.meta.env.VITE_API_URL || '/',
  
  // JWT Token name in localStorage
  ADMIN_TOKEN_NAME: import.meta.env.VITE_ADMIN_TOKEN_NAME || 'adminToken',
  ADMIN_USER_NAME: import.meta.env.VITE_ADMIN_USER_NAME || 'adminUser',
  
  // Other configurations
  DEFAULT_ERROR_MESSAGE: 'An error occurred. Please try again.',
  
  // API endpoints - centralized for easier management
  ENDPOINTS: {
    // Auth endpoints
    AUTH: {
      LOGIN: '/api/admin-login',
      SIGNUP: '/api/admin-signup',
      LOGOUT: '/api/admin-logout',
      VERIFY: '/api/verifyAdmin',
      FORGOT_PASSWORD: '/api/admin-forgot-password',
      RESET_PASSWORD: '/api/approve-admin-forgot-password',
      VERIFY_RESET_TOKEN: '/api/verifyAdminPasswordReset',
      CHANGE_PASSWORD: '/api/admin-change-password',
      VERIFY_PASSWORD_CHANGE: '/api/verifyAdminPasswordChange'
    },
    
    // Profile endpoints
    PROFILE: {
      GET: '/api/admin/profile',
      UPDATE: '/api/admin/profile'
    },
    
    // User endpoints
    USERS: {
      GET_ALL: '/api/users',
      GET_ONE: '/api/users',
      UPDATE: '/api/users',
      DELETE: '/api/users'
    },
    
    // Product endpoints
    PRODUCTS: {
      GET_ALL: '/api/products',
      GET_ONE: '/api/products',
      CREATE: '/api/products',
      UPDATE: '/api/products',
      DELETE: '/api/products'
    }
  }
};

export default env;
