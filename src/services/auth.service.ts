import { api } from "./http";
import { getToken } from "@/lib/utils";

class AuthService {
  async register(data = {}) {
    try {
      const response = await api.post("/register", data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data.message || error.message;
    }
  }
  async login(data = {}) {
    try {
      const response = await api.post("/login", data);
      return response.data;
    } catch (error: any) {
      throw (
        error.response?.data || { message: error.message, status: error.status }
      );
    }
  }
  async uploadProfilePhoto() {
    const token = getToken();
    try {
      await api.post("/upload-profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error: any) {
      throw error.response?.data.message || error.message;
    }
  }
  /* async logout() {
      const token = getToken();
        try { 
          await api.post('/auth/logout', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error: any) {
          throw error.response?.data.message || error.message;
        }
      } */
  /*  async verifyOtp(data: any) {
        try {
          const response = await api.post('/auth/verify-otp', data);
          return response.data;
        } catch (error: any) {
          throw error.response?.data.message || error.message;
        }
      } */
  async verifyEmail(data: any) {
    try {
      const response = await api.post("/verify-email", data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data.message || error.message;
    }
  }
}

export default new AuthService();
