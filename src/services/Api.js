import axios from "axios";
import superjson from "superjson";

class ApiInstance {
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:3000/api/",
      timeout: 1000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      transformResponse: (res) => {
        console.log(res, JSON.parse(res));
        return superjson.parse(res);
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

  setToken(token) {
    this.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

const api = new ApiInstance();

export default api;
