import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://email-sender-1lwfquqqy-gauris-projects-6c76491a.vercel.app';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

class ApiService {
  // Email generation
  async generateEmail(data) {
    try {
      const response = await apiClient.post('/email/generate', data);
      return response;
    } catch (error) {
      throw new Error(`Failed to generate email: ${error.message}`);
    }
  }

  // Improve email
  async improveEmail(data) {
    try {
      const response = await apiClient.post('/email/improve', data);
      return response;
    } catch (error) {
      throw new Error(`Failed to improve email: ${error.message}`);
    }
  }

  // Send email
  async sendEmail(data) {
    try {
      const response = await apiClient.post('/email/send', data);
      return response;
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  // Validate emails
  async validateEmails(emails) {
    try {
      const response = await apiClient.post('/email/validate', { emails });
      return response;
    } catch (error) {
      throw new Error(`Failed to validate emails: ${error.message}`);
    }
  }

  // Get service status
  async getServiceStatus() {
    try {
      const response = await apiClient.get('/email/status');
      return response;
    } catch (error) {
      throw new Error(`Failed to get service status: ${error.message}`);
    }
  }

  // Test email connection
  async testEmailConnection() {
    try {
      const response = await apiClient.get('/email/test-connection');
      return response;
    } catch (error) {
      throw new Error(`Failed to test email connection: ${error.message}`);
    }
  }

  // Health check
  async healthCheck() {
    try {
      const response = await apiClient.get('/health');
      return response;
    } catch (error) {
      throw new Error(`Health check failed: ${error.message}`);
    }
  }
}

const apiService = new ApiService();
export default apiService;