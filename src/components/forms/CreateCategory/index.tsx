import { Formik, Form, FastField } from "formik";

import SelectCategoryIcon from "src/components/common/SelectCategoryIcon";

import CategoriesService from "src/services/CategoriesService";

import { CATEGORIES_PICTURES } from "src/constants";

const initialValues = {
  name: "",
  picture: CATEGORIES_PICTURES[0].id,
};

const CategoriesForm = () => {
  const onSubmit = async (values, actions) => {
    console.log(values);

    const res = await CategoriesService.createCategory(values);
    // mutate("/api/expenses", [res, ...expenses], false);

    console.log(res);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, isValid, isSubmitting, setFieldValue }) => {
        return (
          <Form>
            <SelectCategoryIcon
              handleChange={setFieldValue}
              selected={values.picture}
            />
            <FastField name="name" type="text" placeholder="name" />
            <button type="submit" disabled={!isValid || isSubmitting}>
              Add Category
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CategoriesForm;
