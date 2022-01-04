import ApiInstance from "./Api";

class ExpensesService {
  constructor() {
    this.api = ApiInstance.instance;
  }

  async getExpenses() {
    return await this.api.get("expenses");
  }

  async createExpense(data) {
    return await this.api.post("expenses/create", data);
  }
}

export default new ExpensesService();
