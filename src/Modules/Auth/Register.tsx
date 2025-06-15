import { useState } from "react";
import Authbg from "../../assets/AuthBackground.svg";
import PMSIcon from "../../assets/PMSIcon.png";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import "../../styles/register.css";
import { axiosInstance, USERS_URLS } from "../../services/Urls";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { validateRegisterForm } from "../../services/Validations";

interface FormData {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  profileImage?: FileList; // or FileList | null depending on your logic
}
function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const navigate = useNavigate();

  const password = watch("password");

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      formData.append("userName", data.userName);
      formData.append("email", data.email);
      formData.append("country", data.country);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      if (data.profileImage && data.profileImage[0]) {
        formData.append("profileImage", data.profileImage[0]);
      }

      await axiosInstance.post(USERS_URLS.REGISTER, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Account created successfully!");

navigate("/verify-account")

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
      className="d-flex gap-2 flex-column align-items-center justify-content-center "
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${Authbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <img src={PMSIcon} alt="PMSIcon" className="w-25 h-25"/>
      <div className="d-flex Register-container g-3 flex-column align-items-center justify-content-center">
        <div className=" w-100 px-3 py-3  Register-main-container  border-0 shadow-lg">
          {/* Header */}
          <div className="text-lg-start mt-3 mx-5">
            <h2
              className="fw-bold d-flex flex-column "
              style={{ color: "#ffa726", fontSize: "36px" }}
            >
              <span
                className="text-white fw-light  "
                style={{
                  fontSize: "13px",
                }}
              >
                welcome to PMS
              </span>
              Create New Account
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-center mb-4">
              <label htmlFor="profileImageInput" style={{ cursor: "pointer" }}>
                <div
                  className="rounded-circle mx-auto d-flex align-items-center justify-content-center"
                  style={{
                    width: "80px",
                    height: "80px",
                    background: "rgba(255, 167, 38, 0.2)",
                    border: "3px solid rgba(255, 167, 38, 0.3)",
                    overflow: "hidden",
                  }}
                >
                  {watch("profileImage") && watch("profileImage")?.[0] ? (
                    <img
                      src={URL.createObjectURL(watch("profileImage")![0])}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUser}
                      size="2x"
                      style={{ color: "#ffa726" }}
                    />
                  )}
                </div>
              </label>
              <input
                type="file"
                id="profileImageInput"
                {...register("profileImage")}
                accept="image/*"
                className="d-none"
              />
            </div>
            <div className="row px-5  ">
              {/* User Name */}
              <div className="col-12 mb-2 d-flex flex-column  col-md-6">
                <label
                  className="form-label fw-medium"
                  style={{ color: "#ffa726" }}
                >
                  User Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                    className="bg-transparent text-white"
                  style={{
                    border: "none",
                    background: "none",
                    outline: "none",
                    borderBottomWidth: "1px",
                    borderRadius: "8px",
                    color: "white",
                    padding: "6px 12px",
                    boxShadow: "none",
                  }}
                  {...register("userName", validateRegisterForm.userName)}
                />
                <div
                  style={{
                    height: "1px",
                    width: "100%",
                    background: "white",
                  }}
                ></div>
                {errors.userName && (
                  <div className="invalid-feedback d-block">
                    {errors.userName.message}
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="col-12 mb-2 d-flex flex-column  col-md-6">
                <label
                  className="form-label fw-medium"
                  style={{ color: "#ffa726" }}
                >
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="Enter your E-mail"
                    className="bg-transparent text-white"
                  style={{
                    border: "none",
                    background: "none",
                    outline: "none",
                    borderBottomWidth: "1px",
                    borderRadius: "8px",
                    color: "white",
                    padding: "6px 12px",
                    boxShadow: "none",
                  }}
                  {...register("email",validateRegisterForm.email)}
                />
                <div
                  style={{
                    height: "1px",
                    width: "100%",
                    background: "white",
                  }}
                ></div>
                {errors.email && (
                  <div className="invalid-feedback d-block">
                    {errors.email.message}
                  </div>
                )}
              </div>

              {/* Country */}
              <div className="col-12 mb-2 d-flex flex-column  col-md-6">
                <label
                  className="form-label fw-medium"
                  style={{ color: "#ffa726" }}
                >
                  Country
                </label>
                <input
                  type="text"
                  placeholder="Enter your country"
                  style={{
                    border: "none",
                    background: "none",
                    outline: "none",
                    borderBottomWidth: "1px",
                    borderRadius: "8px",
                    color: "white",
                    padding: "6px 12px",
                    boxShadow: "none",
                  }}
                  {...register("country", validateRegisterForm.country)}
                />
                <div
                  style={{
                    height: "1px",
                    width: "100%",
                    background: "white",
                  }}
                ></div>
                {errors.country && (
                  <div className="invalid-feedback d-block">
                    {errors.country.message}
                  </div>
                )}
              </div>

              {/* Phone Number */}
              <div className="col-12 mb-2 d-flex flex-column  col-md-6">
                <label
                  className="form-label fw-medium"
                  style={{ color: "#ffa726" }}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  style={{
                    border: "none",
                    background: "none",
                    outline: "none",
                    borderBottomWidth: "1px",
                    borderRadius: "8px",
                    color: "white",
                    padding: "6px 12px",
                    boxShadow: "none",
                  }}
                  {...register("phoneNumber", validateRegisterForm.phoneNumber)}
                />
                <div
                  style={{
                    height: "1px",
                    width: "100%",
                    background: "white",
                  }}
                ></div>
                {errors.phoneNumber && (
                  <div className="invalid-feedback d-block">
                    {errors.phoneNumber.message}
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="col-12 mb-2 d-flex flex-column  col-md-6">
                <label
                  className="form-label fw-medium"
                  style={{ color: "#ffa726" }}
                >
                  Password
                </label>
                <div
                  className="position-relative col-12  w-100"
                  style={{
                    width: "100%",
                  }}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-100"
                    placeholder="Enter your Password"
                    style={{
                      border: "none",
                      background: "none",
                      outline: "none",
                      borderBottomWidth: "1px",
                      borderRadius: "8px",
                      color: "white",
                      padding: "6px 12px",
                      boxShadow: "none",
                    }}
                    {...register("password",validateRegisterForm.password)}
                  />

                  <button
                    type="button"
                    className="btn position-absolute top-50 end-0 translate-middle-y me-2"
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "rgba(255, 255, 255, 0.6)",
                      padding: "4px",
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
                <div
                  style={{
                    height: "1px",
                    width: "100%",
                    background: "white",
                  }}
                ></div>
                {errors.password && (
                  <div className="invalid-feedback d-block">
                    {errors.password.message}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="col-12 mb-2 d-flex flex-column  col-md-6">
                <label
                  className="form-label fw-medium"
                  style={{ color: "#ffa726" }}
                >
                  Confirm Password
                </label>
                <div className="position-relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    style={{
                      border: "none",
                      background: "none",
                      outline: "none",
                      borderBottomWidth: "1px",
                      borderRadius: "8px",
                      color: "white",
                      padding: "6px 12px",
                      boxShadow: "none",
                    }}
                     {...register("confirmPassword", validateRegisterForm.confirmPassword(password))}
                  />
                  <button
                    type="button"
                    className="btn position-absolute top-50 end-0 translate-middle-y me-2"
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "rgba(255, 255, 255, 0.6)",
                      padding: "4px",
                    }}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEyeSlash : faEye}
                    />
                  </button>
                </div>
                <div
                  style={{
                    height: "1px",
                    width: "100%",
                    background: "white",
                  }}
                ></div>
                {errors.confirmPassword && (
                  <div className="invalid-feedback d-block">
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="w-100 d-flex justify-content-center align-items-center m-3">
              <button
                type="submit"
                className="btn btn-lg fw-bold"
                disabled={isSubmitting}
                style={{
                  background: "linear-gradient(45deg, #ffa726, #ff9800)",
                  border: "none",
                  borderRadius: "25px",
                  color: "white",
                  padding: "0.3rem 10rem 0.3rem 10rem",
                  fontSize: "18px",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(255, 167, 38, 0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Creating Account...
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
