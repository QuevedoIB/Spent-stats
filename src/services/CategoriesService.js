import ApiInstance from "./Api";

class CategoriesService {
  constructor() {
    this.api = ApiInstance.instance;
  }

  async getCategories() {
    return await this.api.get("categories");
  }

  async createCategory(data) {
    return await this.api.post("categories/create", data);
  }
}

export default new CategoriesService();
