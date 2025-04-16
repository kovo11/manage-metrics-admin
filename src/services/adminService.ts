
// Re-export all admin-related services from specialized modules
// This maintains backward compatibility with existing imports

export * from './authService';

// Data services
export * from './usersService';
export * from './ordersService';
export * from './ticketsService';
export * from './messagesService';
export * from './paymentsService';
export * from './walletService';
export * from './digitalProductsService';
export * from './couponsService';
export * from './homepageService';
export * from './analyticsService';
export * from './ticketService';
export * from './messageService';
export { apiWrapper } from './utils/apiUtils';
