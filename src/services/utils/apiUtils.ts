
// Error wrapper for API calls
export const apiWrapper = async (apiCall: () => Promise<any>) => {
  try {
    return await apiCall();
  } catch (error) {
    // Just rethrow the error - toast handling is in apiClient interceptors
    throw error;
  }
};
