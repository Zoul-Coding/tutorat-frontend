import { api } from "./http";
import { getToken } from "@/lib/utils";

class AnnonceService {
  async createAnnonce(data: {}) {
    const token = getToken();

    try {
      const response = await api.post("/create-annonce", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data.message || error.message;
    }
  }

  async getUserAnnonce() {
    const token = getToken();

    try {
      const response = await api.get("/user-annonce", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data.message || error.message;
    }
  }

  async getAllAnnonce() {
    try {
      const response = await api.get("/all-annonce");
      return response.data;
    } catch (error: any) {
      throw error.response?.data.message || error.message;
    }
  }

  async showAnnonce(slug:String) {
    try {
      const response = await api.get(`/annonce/${slug}`);      
      return response.data;
    } catch (error: any) {
      throw error.response?.data.message || error.message;
    }
  }

  async getAnnonceById(id:string) {
    const token = getToken();

    try {
      const response = await api.get(`/get-annonce/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data.message || error.message;
    }
  }

async updateAnnonce(id: string, data: any) {
  const token = getToken();

  try {
    const response = await api.put(`/update-annonce/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data.message || error.message;
  }
}

async deleteAnnonce(id: string) {
  const token = getToken();

  try {
    const response = await api.delete(`/delete-annonce/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw error.response?.data.message || error.message;
  }
}
}

export default new AnnonceService();
