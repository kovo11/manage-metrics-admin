
// Configuration values from environment variables
const env = {
  // API BASE URL
  API_URL: import.meta.env.VITE_API_URL || '/',
  
  // JWT Token name in localStorage
  ADMIN_TOKEN_NAME: import.meta.env.VITE_ADMIN_TOKEN_NAME || 'adminToken',
  ADMIN_USER_NAME: import.meta.env.VITE_ADMIN_USER_NAME || 'adminUser',
  
  // Product API endpoints
  PRODUCT_API: {
    GET_ALL: import.meta.env.VITE_PRODUCT_API_GET_ALL || '/api/products',
    GET_FEATURED: import.meta.env.VITE_PRODUCT_API_GET_FEATURED || '/api/featured-products',
    POST_TO_HOMEPAGE: import.meta.env.VITE_PRODUCT_API_POST_TO_HOMEPAGE || '/api/post-product-to-homepage',
    UPDATE_ON_HOMEPAGE: import.meta.env.VITE_PRODUCT_API_UPDATE_ON_HOMEPAGE || '/api/update-product-on-homepage',
    REMOVE_FROM_HOMEPAGE: import.meta.env.VITE_PRODUCT_API_REMOVE_FROM_HOMEPAGE || '/api/remove-product-from-homepage',
  },
  
  // Other configurations
  DEFAULT_ERROR_MESSAGE: 'An error occurred. Please try again.',
};

export default env;
