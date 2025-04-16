
// Re-export all admin-related services from specialized modules
// This maintains backward compatibility with existing imports

export * from './authService';

// Data services
export * from './usersService';
export * from './ordersService';
export { 
  // Explicitly re-export from ticketService to avoid conflicts with ticketsService
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  closeTicket,
  assignTicket,
  deleteTicket
} from './ticketService';
export { 
  // Explicitly re-export from messageService to avoid conflicts with messagesService
  getAllMessages
} from './messageService';
export * from './paymentsService';
export * from './walletService';
export * from './digitalProductsService';
export * from './couponsService';
export * from './analyticsService';

// Explicitly re-export product services to avoid naming conflicts
export {
  getAllProducts,
  getFeaturedProducts,
  postProductToHomepage,
  updateProductOnHomepage,
  removeProductFromHomepage
} from './productService';

// Homepage services are renamed to avoid conflicts
export {
  getFeaturedProducts as getHomepageFeaturedProducts,
  postProductToHomepage as postToHomepage,
  updateProductOnHomepage as updateOnHomepage,
  removeProductFromHomepage as removeFromHomepage
} from './homepageService';

export { apiWrapper } from './utils/apiUtils';

// Re-export user functions from userService
export { getAllUsers, getUserById, updateUser, deleteUser } from './userService';
