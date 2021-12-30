import { Formik, Form, FastField } from "formik";

const initialValues = {
  concept: "",
  amount: "",
  category: "",
  date: "",
};

const ExpenseForm = () => {
  const onSubmit = (values, actions) => {};

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
