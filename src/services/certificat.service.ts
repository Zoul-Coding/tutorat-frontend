import { api } from "./http";
import { getToken } from "@/lib/utils";

class  CertificatService {
  async createCertificat(data: {}) {
    const token = getToken();

    try {
      const response = await api.post(
        "/create-certificat",
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

export default new CertificatService();
