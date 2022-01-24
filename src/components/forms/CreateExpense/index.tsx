import { Formik, Form, FastField } from "formik";
import useSWR, { useSWRConfig } from "swr";

import ExpensesService from "src/services/ExpensesService";
import CategoriesService from "src/services/CategoriesService";

const initialValues = {
  concept: "",
  amount: "",
  categoryId: "",
  date: "",
};

const ExpenseForm = () => {
  const { mutate } = useSWRConfig();
  const { data: categories } = useSWR(
    "/api/categories",
    async () => await CategoriesService.getCategories()
  );

  const { data: expenses } = useSWR(
    "/api/expenses",
    async () => await ExpensesService.getExpenses()
  );

  const onSubmit = async (values, actions) => {
    try {
      const res = await ExpensesService.createExpense(values);
      mutate("/api/expenses", [res, ...expenses], false);
    } catch (error) {
      //handle error
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, isValid, isSubmitting }) => {
        return (
          <Form>
            <FastField name="concept" type="text" placeholder="Concept" />
            <FastField name="amount" type="number" placeholder="Amount" />

            <FastField name="categoryId" as="select">
              <option value="">Select a category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </FastField>
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
