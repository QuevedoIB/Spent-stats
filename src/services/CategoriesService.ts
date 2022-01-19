
import { Category } from "@prisma/client";
import { AxiosInstance } from "axios";
import ApiInstance from "./Api";

class CategoriesService {
  api: AxiosInstance;
  constructor() {
    this.api = ApiInstance.instance;
  }

  async getCategories() : Promise<Category[]> {
    return await this.api.get("categories");
  }

  async createCategory(data) {
    return await this.api.post("categories/create", data);
  }
}

export default new CategoriesService();
