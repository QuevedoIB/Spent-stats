import axios, { AxiosInstance } from "axios";

import { MINUTE_MILLISECONDS } from "src/constants";

class ApiInstance {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: MINUTE_MILLISECONDS,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      responseType: "json",
    });

    this.instance.interceptors.response.use(
      (response) => {
        // parse response
        if (response?.data) {
          return response.data;
        }

        return response;
      },
      (error) => {
        // generic error handling
        return Promise.reject(error.message);
      }
    );
  }
}

const api = new ApiInstance();

export default api;
