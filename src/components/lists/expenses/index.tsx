import useSWR from "swr";
import { Entry } from "@prisma/client";

import ExpensesService from "src/services/ExpensesService";

import parseDate from "src/utils/parseDate";

const ExpensesList = () => {
  const { data } = useSWR(
    "/api/expenses",
    async () => await ExpensesService.getExpenses()
  );
  console.log({ data });
  return (
    <ul>
      {data?.expenses?.map((expense: Entry) => (
        <li key={expense.id}>
          <p>
            {expense.concept}: {expense.amount}€
          </p>
          <p>{parseDate({ date: expense.date })}</p>
        </li>
      ))}
    </ul>
  );
};

export default ExpensesList;
