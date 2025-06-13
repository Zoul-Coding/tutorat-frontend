import { api } from "./http";
import { getToken } from "@/lib/utils";

class UserService {
  async uploadProfilePhoto(data: {}) {
    const token = getToken();

    try {
      const response = await api.post(
        "/upload-profile",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data.message || error.message;
    }
  }
  
  async userInfos() {
    const token = getToken();

    try {
      const response = await api.get(
        "/user-infos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data.message || error.message;
    }
  }
}

export default new UserService();
