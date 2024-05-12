import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .min(2, "First Name must be at least 2 characters")
    .max(50, "First Name must be at most 50 characters")
    .matches(/^[A-Za-z]+$/, "First Name must contain only alphabets"),
  lastName: Yup.string()
    .matches(/^[A-Za-z]*$/, "Last Name must contain only alphabets")
    .nullable(),
  address: Yup.string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters long"),
});

const Form2 = ({ formRef, formData, handleSave }) => {
  const initialValues = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    address: formData.address,
  };

  Form2.propTypes = {
    formRef: PropTypes.object.isRequired,
    formData: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    }).isRequired,
    handleSave: PropTypes.func.isRequired,
  };

  return (
    <div className="">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => await handleSave(values)}
        innerRef={formRef}
      >
        {() => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-500">
                First Name
              </label>
              <Field
                type="text"
                id="firstName"
                name="firstName"
                className="w-full rounded border px-3 py-2"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-500">
                Last Name
              </label>
              <Field
                type="text"
                id="lastName"
                name="lastName"
                className="w-full rounded border px-3 py-2"
              />
              <ErrorMessage name="lastName" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-500">
                Address
              </label>
              <Field
                type="text"
                id="address"
                name="address"
                className="w-full rounded border px-3 py-2"
              />
              <ErrorMessage name="address" component="div" className="mt-1 text-sm text-red-500" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Form2;
