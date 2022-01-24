import { Entry } from "@prisma/client";
import { AxiosInstance } from "axios";
import ApiInstance from "./Api";

interface ExpenseForm {
  name: string;
  picture: string
}

class ExpensesService {
  api: AxiosInstance;
  constructor() {
    this.api = ApiInstance.instance;
  }

  async getExpenses(): Promise<{ total: number; expenses: Entry[]}> {
    return await this.api.get("expenses");
  }

  async createExpense(data: ExpenseForm): Promise<Boolean> {
    return await this.api.post("expenses/create", data);
  }
}

export default new ExpensesService();
