import { useCallback, useState } from "react";
import useSWR from "swr";
import { Entry } from "@prisma/client";

import VirtualizedList from "src/components/lists/VirtualizedList";

import ExpensesService from "src/services/ExpensesService";

import parseDate from "src/utils/parseDate";

const ExpenseRow = ({ item: { id, concept, amount, date } }) => {
  return (
    <>
      <p>
        {concept}: {amount}€
      </p>
      <p>{parseDate({ date })}</p>
    </>
  );
};

const ExpensesList = () => {
  const [cursorDate, setCursorDate] = useState(null);
  const { data } = useSWR(
    `/api/expenses${cursorDate ? `?cursorDate=${cursorDate}` : ""}`,
    async () => await ExpensesService.getExpenses(cursorDate)
  );

  const handleEndListReached = useCallback(() => {
    if (data?.total > data?.expenses.length) {
      console.log("FETCH MORE");
      setCursorDate(data?.expenses[data?.expenses.length - 1].date);
    }
  }, [data?.expenses, data?.total]);

  console.log({ data, cursorDate });

  return (
    <VirtualizedList
      totalLength={data?.total}
      list={data?.expenses}
      onEndReached={handleEndListReached}
      Row={ExpenseRow}
      keyExtractor="id"
      itemHeight={100}
    />
  );
};

export default ExpensesList;
