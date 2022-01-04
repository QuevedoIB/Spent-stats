import useSWR from "swr";

import ExpensesService from "src/services/ExpensesService";

const ExpensesList = () => {
  const { data } = useSWR(
    "/api/expenses",
    async () => await ExpensesService.getExpenses()
  );
  console.log({ data });
  return <div></div>;
};

export default ExpensesList;
