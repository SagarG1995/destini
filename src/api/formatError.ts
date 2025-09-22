
export interface ApiError {
  message: string;
  status: number;
  success: boolean,
  isNetworkError: boolean;
  data?: any;
}

export const formatError = (error: any): ApiError => {
  if (error.response) {
    // Server returned a response with an error status
    return {
      message: error.response?.data?.message || 'Something went wrong',
      status: error.response.status,
      success: false,
      isNetworkError: false,
      data: error.response.data,
    };
  }

  if (error.request) {
    // Request made, no response received
    return {
      message: 'No response from server. Please check your network.',
      status: 0,
      success: false,
      isNetworkError: true,
    };
  }

  // Something else went wrong
  return {
    message: error.message || 'Unknown error',
    status: -1,
    success: false,
    isNetworkError: true,
  };
};
