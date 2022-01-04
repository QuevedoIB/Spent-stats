import ApiInstance from "./Api";

class ExpensesService {
  constructor() {
    this.api = ApiInstance;
  }

  async getExpenses() {
    return await this.api.get("expenses");
  }
}

export default new ExpensesService();
