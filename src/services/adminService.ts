
// Re-export all admin-related services for cleaner imports

// Auth services
export * from './authService';

// Data services
export * from './userService';
export * from './productService';
export * from './ordersService';
export * from './ticketsService';
export * from './messagesService';
export * from './paymentsService';
export * from './walletService';
export * from './digitalProductsService';
export * from './couponsService';
export * from './homepageService';
export * from './analyticsService';

// Utility exports
export { apiClient } from './apiClient';
export { apiWrapper } from './utils/apiUtils';
