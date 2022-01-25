import { useCallback } from "react";
import useSWR from "swr";
import { Entry } from "@prisma/client";

import VirtualizedList from "src/components/lists/VirtualizedList";

import ExpensesService from "src/services/ExpensesService";

import parseDate from "src/utils/parseDate";

const ExpenseRow = (props) => {
  console.log({ props });
  return <li style={{ height: "100px" }}>HEY</li>;
};

const ExpensesList = () => {
  const { data } = useSWR(
    "/api/expenses",
    async () => await ExpensesService.getExpenses()
  );

  const handleEndListReached = useCallback(() => {
    if (data?.total < data?.expenses.length) {
      console.log("FETCH MORE");
    }
  }, [data?.expenses.length, data?.total]);

  return (
    <>
      <VirtualizedList
        totalLength={data?.total}
        list={data?.expenses}
        onEndReached={handleEndListReached}
        Row={ExpenseRow}
        keyExtractor="id"
      />
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
    </>
  );
};

export default ExpensesList;
