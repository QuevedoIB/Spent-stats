import { Entry } from "@prisma/client";
import { AxiosInstance } from "axios";
import ApiInstance from "./Api";

import {DEFAULT_LIMIT} from "src/constants";

interface ExpenseForm {
  name: string;
  picture: string
}

class ExpensesService {
  api: AxiosInstance;
  constructor() {
    this.api = ApiInstance.instance;
  }

  async getExpenses(cursorDate): Promise<{ total: number; expenses: Entry[]}> {
    return await this.api.get(`expenses/${DEFAULT_LIMIT}/${cursorDate}`);
  }

  async createExpense(data: ExpenseForm): Promise<Boolean> {
    return await this.api.post("expenses/create", data);
  }
}

export default new ExpensesService();
