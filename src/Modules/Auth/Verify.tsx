
import Verfiybg from "../../assets/VerfiyBackground.svg";
import PMSIcon from "../../assets/PMSIcon.png";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "../../styles/register.css";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance, USERS_URLS } from "../../services/Urls";
import { verifyValidation } from "../../services/Validations";

type FormData = {
  email: string;
  code: string;
};

function Verify() {
 
  const navigate = useNavigate();
    const location = useLocation();
  const emailFromRegister = location.state?.email || "";

   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: emailFromRegister 
    },
  });

  const onSubmit = async (data: FormData) => {
    // Simulate backend call
    console.log(data);
    try {
      await axiosInstance.put(USERS_URLS.Verify, data);

      toast.success("OTP Verified Successfully!");

      navigate("/login");
    } catch (error: any) {
      const errors = error?.response?.data?.additionalInfo?.errors;

      if (errors) {
        Object.entries(errors).forEach(([_, messages]) => {
          (messages as string[]).forEach((msg) => {
            toast.error(msg);
          });
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div
      className="d-flex gap-2 flex-column align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${Verfiybg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <img src={PMSIcon} alt="PMSIcon" className="w-25 h-25" />
      <div className="d-flex Verify-container g-3 flex-column align-items-center justify-content-center">
        <div className="w-100  py-3 Verify-main-container  d-flex flex-column justify-content-lg-start border-0 shadow-lg">
          {/* Header */}
          <div className="text-start mt-5 mx-5">
            <h2
              className="fw-bold d-flex flex-column"
              style={{ color: "#ffa726", fontSize: "36px" }}
            >
              <span
                className="text-white fw-light"
                style={{ fontSize: "13px" }}
              >
                Welcome to PMS
              </span>
              Verify Account
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex mt-3 mx-5 justify-content-center   flex-column ">
              {/* Email */}
              <div className="col-12 mb-3  d-flex flex-column ">
                <label
                  className="form-label fw-medium"
                  style={{ color: "#ffa726" }}
                >
                  E-mail
                </label>
                <input
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
                />
                {errors.email && (
                  <div className="invalid-feedback d-block">
                    {errors.email.message}
                  </div>
                )}
              </div>

              {/* OTP */}
              <div className="col-12 mb-3 d-flex flex-column ">
                <label
                  className="form-label fw-medium"
                  style={{ color: "#ffa726" }}
                >
                  OTP Verification
                </label>
                <input
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

            {/* Submit Button */}
            <div className="w-100 d-flex justify-content-center align-items-center m-3 mb-5">
              <button
                type="submit"
                className="btn btn-lg fw-bold"
                style={{
                  background: "linear-gradient(45deg, #ffa726, #ff9800)",
                  border: "none",
                  borderRadius: "25px",
                  color: "white",
                  padding: "0.6rem 13rem",
                  fontSize: "18px",
                  transition: "all 0.3s ease",
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Verify;
