export default function useApiUrl() {
    // Return the API URL based on the environment
    return process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL_DEV;
  }