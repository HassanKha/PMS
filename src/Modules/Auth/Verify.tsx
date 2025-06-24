import Verfiybg from "../../assets/VerfiyBackground.svg";
import PMSIcon from "../../assets/PMSIcon.png";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "../../styles/register.css";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance, USERS_URLS } from "../../services/Urls";
import { verifyValidation } from "../../services/Validations";
import type { FormDataVerify } from "../../interfaces/FormData";
import { useState } from "react";
import LoadingPage from '../../shared/LoadingPage/LoadingPage';


function Verify() {
  let [btnloading, setbtnloading] = useState(false);
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
    setbtnloading(true)
    try {
      let response = await axiosInstance.put(USERS_URLS.Verify, data);
      toast.success(response?.data?.message ||"OTP Verified Successfully!");
      navigate("/login");
    } catch (error: any) {
      const errors = error?.response?.data?.additionalInfo?.errors;

      if (errors) {
        Object.entries(errors).forEach(([_, messages]) => {
          (messages as string[]).forEach((msg) => {
            toast.error(msg||"OTP is not correct");
          });
        });
      } else {
        toast.error(error?.response?.data?.message||"OTP is not correct");
      }

    } finally {
      setbtnloading(false)
    }
  };

  return (
    <>
      {btnloading ? <LoadingPage /> : <div
        className="d-flex gap-2 flex-column align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${Verfiybg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        <img src={PMSIcon} alt="PMSIcon" className="w-25 ImgSize h-25" />
        <div className="d-flex Verify-container g-3 flex-column align-items-center justify-content-center">
          <div className="w-100  py-3 Verify-main-container  d-flex flex-column justify-content-lg-start border-0 shadow-lg">
           
            <div className="text-start mt-5 mx-5">
              <h2
                className="fw-bold d-flex flex-column title-auth"
                style={{ color: "#ffa726", fontSize: "clamp(1.5rem, 5vw, 2.25rem)" }}
              >
                <span
                  className="text-white fw-light"
                  style={{ fontSize: "13px" }}
                >
                  Welcome to PMS
                </span>
                <span className="d-flex align-items-center">
                  <span className="FC">V</span>erify Account
                </span>
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex mt-3 mx-5 justify-content-lg-center justify-content-start  align-content-lg-center   flex-column ">

                <div className="col-12 mb-3  d-flex flex-column ">
                  <label htmlFor="email"
                    className="form-label fw-medium"
                    style={{ color: "#ffa726" }}
                  >
                    E-mail
                  </label>
                  <input
                  id="email"
                    type="email"
                    placeholder="Enter your E-mail"
                    className="bg-transparent text-white w-100"
                    style={{
                      border: "none",
                      outline: "none",
                      borderBottom: "1px solid white",
                      color: "white",
                      padding: "6px 12px",
                    }}
                    {...register("email", verifyValidation.email)}
                    readOnly />
                  {errors.email && (
                    <div className="invalid-feedback d-block">
                      {errors.email.message}
                    </div>
                  )}
                </div>

              
                <div className="col-12 mb-3 d-flex flex-column ">
                  <label
                    htmlFor="OTP"
                    className="form-label fw-medium"
                    style={{ color: "#ffa726" }}
                  >
                    OTP Verification
                  </label>
                  <input
                    id="OTP"
                    type="text"
                    placeholder="Enter Verification"
                    maxLength={6}
                    className="bg-transparent text-white"
                    style={{
                      border: "none",
                      outline: "none",
                      borderBottom: "1px solid white",

                      padding: "6px 12px",

                      color: "white",
                    }}
                    {...register("code", verifyValidation.code)}
                  />
                  {errors.code && (
                    <div className="invalid-feedback d-block">
                      {errors.code.message}
                    </div>
                  )}
                </div>
              </div>

              
              <div className="d-flex justify-content-center mx-sm-5 mx-lg-0 mt-4">
                <button
                  type="submit"
                  className="btn fw-bold w-100"
                  style={{
                    maxWidth: "300px",
                    background: "linear-gradient(45deg, #ffa726, #ff9800)",
                    border: "none",
                    borderRadius: "25px",
                    color: "white",
                    fontSize: "18px",
                  }}        >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>}
    </>

  );
}

export default Verify;
