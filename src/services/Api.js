import axios from "axios";

class ApiInstance {
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:8080/api/",
      timeout: 1000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  setToken(token) {
    this.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  getHello() {
    return this.instance.get("hello");
  }
}

const api = new ApiInstance();

export default api;
