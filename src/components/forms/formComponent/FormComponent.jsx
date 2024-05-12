import { useRef, useState } from "react";
import Form1 from "../form1/Form1";
import Form2 from "../form2/Form2";
import Form3 from "../form3/Form3";
import { Tab, Tabs } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { ServiceAPI } from "../../../services/apiHelper/apiService";
import { useNavigate } from "react-router-dom";

function FormComponent() {
  const [step, setStep] = useState(1);
  const [nextButton, setNextButton] = useState(false);

  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    countryCode: "",
    phoneNumber: "",
    acceptTermsAndCondition: false,
  });

  const formRef = useRef();
  const navigate = useNavigate();

  const FormSelector = () => {
    if (step === 1) {
      return <Form1 formRef={formRef} formData={formData} handleSave={handleSave} />;
    }

    if (step === 2) {
      return <Form2 formRef={formRef} formData={formData} handleSave={handleSave} />;
    }

    if (step === 3) {
      return <Form3 formRef={formRef} formData={formData} handleSave={handleSave} />;
    }
  };

  const handleSave = async (val) => {
    await setFormData((prevFormData) => ({
      ...prevFormData,
      ...val,
    }));

    if (nextButton === true) {
      setStep((step) => step + 1);
    }

    if (step === 3) {
      await delete val?.acceptTermsAndCondition;
      await delete formData?.acceptTermsAndCondition;

      let response = await ServiceAPI.submitForm({ ...formData, ...val });
      if (!response) {
        toast.error("Something went wrong, please try again.");
        window.location.reload();
      }

      if (response?.data) {
        await toast.success("Success");
        await navigate("/posts");
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    if (newValue === 1) {
      if (formData.emailId && formData.password) {
        setStep(newValue);
      }
    }

    if (newValue === 2) {
      if (formData.firstName && formData.address) {
        setStep(newValue);
      }
    }

    if (newValue === 3) {
      if (formData.countryCode && formData.phoneNumber) {
        setStep(newValue);
      }
    }
  };

  return (
    <>
      <div className="rounded-lg bg-gray-50 p-7 px-10 text-gray-900 shadow-lg md:mx-auto md:mt-32 md:w-[60%]">
        <div className="pb-5">
          <Tabs value={step} onChange={handleTabChange} centered>
            <Tab className="w-[35%] bg-amber-700" label="Form 1" value={1} />
            <Tab className="w-[35%] bg-amber-700" label="Form 2" value={2} />
            <Tab className="w-[35%] bg-amber-700" label="Form 3" value={3} />
          </Tabs>
        </div>
        {FormSelector()}
        <div htmlFor="footer" className="pt-5">
          <div className="flex flex-row justify-between">
            <button
              disabled={step == 1}
              onClick={() => setStep((step) => step - 1)}
              className={`w-[45%] rounded px-4 py-2 text-white transition duration-300 ${
                step === 1 ? "cursor-not-allowed bg-gray-400" : "bg-amber-700 hover:bg-amber-900"
              }`}
            >
              Back
            </button>
            <button
              onClick={() => {
                formRef.current.submitForm();
                setNextButton(false);
              }}
              className="w-[45%] rounded bg-amber-700 px-4 py-2 text-white transition duration-300 hover:bg-amber-900"
            >
              Save
            </button>
          </div>
          <button
            disabled={step == 3}
            onClick={() => {
              formRef.current.submitForm();
              setNextButton(true);
            }}
            className={`mt-3 w-full rounded px-4 py-2 text-white transition duration-300 ${
              step === 3 ? "cursor-not-allowed bg-gray-400" : "bg-amber-700 hover:bg-amber-900"
            }`}
          >
            Save and Next
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default FormComponent;
