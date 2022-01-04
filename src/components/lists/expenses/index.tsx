import useSWR from "swr";

import ExpensesService from "src/services/ExpensesService";

const dateFormatter = new Intl.DateTimeFormat("es-ES");

const ExpensesList = () => {
  const { data } = useSWR(
    "/api/expenses",
    async () => await ExpensesService.getExpenses()
  );
  console.log({ data });
  return (
    <ul>
      {data?.map((expense) => (
        <li key={expense.id}>
          <p>
            {expense.concept}: {expense.amount}€
          </p>
          {/* <p>{dateFormatter.format(expense.date)}</p> */}
        </li>
      ))}
    </ul>
  );
};

export default ExpensesList;
