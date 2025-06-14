import { api } from "./http";
import { getToken } from "@/lib/utils";

class ExperienceService {
  async createExperience(data: {}) {
    const token = getToken();

    try {
      const response = await api.post(
        "/create-experience",
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
}

export default new ExperienceService();
