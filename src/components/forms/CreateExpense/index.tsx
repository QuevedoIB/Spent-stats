import { Formik, Form, FastField } from "formik";
import useSWR from "swr";

import ExpensesService from "src/services/ExpensesService";
import CategoriesService from "src/services/CategoriesService";

const initialValues = {
  concept: "",
  amount: "",
  category: "",
  date: "",
};

const ExpenseForm = () => {
  const { data: categories } = useSWR(
    "/api/categories",
    async () => await CategoriesService.getCategories()
  );

  console.log({ categories });

  const onSubmit = async (values, actions) => {
    console.log(values);

    const res = await ExpensesService.createExpense(values);

    console.log(res);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, isValid, isSubmitting }) => {
        return (
          <Form>
            <FastField name="concept" type="text" placeholder="Concept" />
            <FastField name="amount" type="number" placeholder="Amount" />
            <FastField name="category" type="text" placeholder="Category" />
            <FastField name="date" type="date" placeholder="Date" />
            <button type="submit" disabled={!isValid || isSubmitting}>
              Add Expense
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ExpenseForm;
