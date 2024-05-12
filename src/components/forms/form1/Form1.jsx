import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

const validationSchema = Yup.object().shape({
  emailId: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*\d.*\d)(?=.*[@$!%*?&].*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 2 uppercase letters, 2 lowercase letters, 2 numbers, and 2 special characters",
    )
    .required("Password is required"),
});

const Form1 = ({ formRef, formData, handleSave }) => {
  const initialValues = {
    emailId: formData.emailId,
    password: formData.password,
  };

  Form1.propTypes = {
    formRef: PropTypes.object.isRequired,
    formData: PropTypes.shape({
      emailId: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
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
              <label htmlFor="emailId" className="block text-sm font-medium text-gray-500">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="emailId"
                className="w-full rounded border px-3 py-2"
              />
              <ErrorMessage name="emailId" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-500">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="w-full rounded border px-3 py-2"
              />
              <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-500" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Form1;
