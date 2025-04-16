
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
export * from './analyticsService';
export * from './ticketService';
export * from './messageService';

// Explicitly re-export product services to avoid naming conflicts
export {
  getAllProducts,
  getFeaturedProducts,
} from './productService';

// Homepage services are renamed to avoid conflicts
export {
  getFeaturedProducts as getHomepageFeaturedProducts,
  postProductToHomepage as postToHomepage,
  updateProductOnHomepage as updateOnHomepage,
  removeProductFromHomepage as removeFromHomepage
} from './homepageService';

export { apiWrapper } from './utils/apiUtils';
