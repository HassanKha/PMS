
import PMSIcon from "../../assets/PMSIcon.png";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "../../styles/Verify.css";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance, USERS_URLS } from "../../services/Urls";
import { verifyValidation } from "../../services/Validations";
import type { FormDataVerify } from "../../interfaces/AuthContextType";
import { useState } from "react";
import LoadingPage from '../../shared/LoadingPage/LoadingPage';

function Verify() {
  const [btnloading, setbtnloading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromRegister = location.state?.email || "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormDataVerify>({
    defaultValues: {
      email: emailFromRegister
    },
  });

  const onSubmit = async (data: FormDataVerify) => {
    setbtnloading(true);
    try {
      let response = await axiosInstance.put(USERS_URLS.Verify, data);
      toast.success(response?.data?.message ||"OTP Verified Successfully!");
      navigate("/login");
    } catch (error: any) {
      const errors = error?.response?.data?.additionalInfo?.errors;
      if (errors) {
        Object.entries(errors).forEach(([_, messages]) => {
          (messages as string[]).forEach((msg) => toast.error(msg));
        });
      } else {
        toast.error(error?.response?.data?.message||"OTP is not correct");
      }
    } finally {
      setbtnloading(false);
    }
  };

  return (
    <>
      {btnloading ? (
        <LoadingPage />
      ) : (
        <div
          className="verify-bg d-flex gap-2 flex-column align-items-center justify-content-center"
        >
          <img src={PMSIcon} alt="PMSIcon" className="w-25 ImgSize h-25" />
          <div className="d-flex Verify-container g-3 flex-column align-items-center justify-content-center">
            <div className="w-100 py-3 Verify-main-container d-flex flex-column justify-content-lg-start border-0 shadow-lg">
              <div className="text-start mt-5 mx-5">
                <h2 className="fw-bold d-flex flex-column title-auth text-warning verify-title">
                  <span className="text-white fw-light verify-subtitle">Welcome to PMS</span>
                  <span className="d-flex align-items-center">
                    <span className="FC">V</span>erify Account
                  </span>
                </h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex mt-3 mx-5 justify-content-lg-center justify-content-start align-content-lg-center flex-column">
                  <div className="col-12 mb-3 d-flex flex-column">
                    <label htmlFor="email" className="form-label fw-medium text-warning">E-mail</label>
                    <input
                    id="email"
                      type="email"
                      placeholder="Enter your E-mail"
                      className="verify-input bg-transparent text-white w-100"
                      {...register("email", verifyValidation.email)}
                      readOnly
                    />
                    {errors.email && (
                      <div className="invalid-feedback d-block">{errors.email.message}</div>
                    )}
                  </div>

                  <div className="col-12 mb-3 d-flex flex-column">
                    <label htmlFor="OTP" className="form-label fw-medium text-warning">OTP Verification</label>
                    <input
                    id="OTP"
                      type="text"
                      placeholder="Enter Verification"
                      maxLength={6}
                      className="verify-input bg-transparent text-white"
                      {...register("code", verifyValidation.code)}
                    />
                    {errors.code && (
                      <div className="invalid-feedback d-block">{errors.code.message}</div>
                    )}
                  </div>
                </div>

                <div className="d-flex justify-content-center mx-sm-5 mx-lg-0 mt-4">
                  <button
                    type="submit"
                    className="btn verify-btn fw-bold w-100"
                    disabled={isSubmitting}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Verify;
