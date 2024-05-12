import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

const validationSchema = Yup.object().shape({
  countryCode: Yup.string().required("Country Code is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^\d{10}$/, "Phone Number must be exactly 10 digits"),
  acceptTermsAndCondition: Yup.boolean().oneOf([true], "Terms and conditions must be accepted"),
});

const Form3 = ({ formRef, formData, handleSave }) => {
  const initialValues = {
    countryCode: formData.countryCode,
    phoneNumber: formData.phoneNumber,
    acceptTermsAndCondition: formData.acceptTermsAndCondition,
  };

  Form3.propTypes = {
    formRef: PropTypes.object.isRequired,
    formData: PropTypes.shape({
      countryCode: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
      acceptTermsAndCondition: PropTypes.bool.isRequired,
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
              <label htmlFor="countryCode" className="block text-sm font-medium text-gray-500">
                Country Code
              </label>
              <Field
                as="select"
                id="countryCode"
                name="countryCode"
                className="w-full rounded border px-3 py-2"
              >
                <option value="">Select Country Code</option>
                <option value="+91">India (+91)</option>
                <option value="+1">America (+1)</option>
              </Field>
              <ErrorMessage
                name="countryCode"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-500">
                Phone Number
              </label>
              <Field
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="w-full rounded border px-3 py-2"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            <div>
              <label className="block">
                <Field
                  type="checkbox"
                  name="acceptTermsAndCondition"
                  className="mr-2 text-sm font-medium text-gray-500"
                />
                Accept Terms and Conditions
              </label>
              <ErrorMessage
                name="acceptTermsAndCondition"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Form3;
