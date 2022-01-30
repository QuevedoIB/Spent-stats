import { useCallback, useState, useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import { Entry } from "@prisma/client";

import VirtualizedList from "src/components/lists/VirtualizedList";

import ExpensesService from "src/services/ExpensesService";

import useStaleSwr from "src/hooks/useStaleSwr";
import parseDate from "src/utils/parseDate";
import { DEFAULT_LIMIT } from "src/constants";

const getKey = (cursorDate, pageSize) => {
  console.log({ cursorDate, pageSize });
  return `/api/expenses${cursorDate ? `?cursorDate=${cursorDate}` : ""}`;
};

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

  const {
    data: [items] = [],
    error,
    mutate,
    size,
    setSize,
    isValidating,
  } = useStaleSwr({
    getKey: () => getKey(cursorDate, DEFAULT_LIMIT),
    fetcher: () => ExpensesService.getExpenses(cursorDate),
  });

  console.log({ items, isValidating });

  const isItemsLeft = useMemo(
    () => items?.total > items?.expenses?.length,
    [items?.expenses?.length, items?.total]
  );

  const handleEndListReached = useCallback(() => {
    if (isItemsLeft) {
      console.log("FETCH MORE");
      setCursorDate(items?.expenses[items?.expenses.length - 1].date);
    }
  }, [items?.expenses, isItemsLeft]);

  return (
    <VirtualizedList
      totalLength={items?.total}
      list={items?.expenses}
      onEndReached={handleEndListReached}
      Row={ExpenseRow}
      keyExtractor="id"
      itemHeight={100}
      keepObserving={isItemsLeft}
    />
  );
};

export default ExpensesList;
