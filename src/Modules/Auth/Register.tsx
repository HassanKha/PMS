// Refactored to external CSS and Bootstrap (No color or design changes)

import { useState } from "react";
import PMSIcon from "../../assets/PMSIcon.png";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import "../../styles/register.css";
import { axiosInstance, USERS_URLS } from "../../services/Urls";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { validateRegisterForm } from "../../services/Validations";
import type { FormDataRegister } from './../../interfaces/FormData';
import LoadingPage from '../../shared/LoadingPage/LoadingPage';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormDataRegister>();

  const navigate = useNavigate();

  const password = watch("password");

  const onSubmit = async (data: FormDataRegister) => {
    setLoading(true)
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
      navigate("/verify-account", {
        state: { email: data.email },
      })

    } catch (error: any) {
      const apiMessage = error?.response?.data?.message;
      const errors = error?.response?.data?.additionalInfo?.errors;

      if (apiMessage) {
        toast.error(apiMessage);
      } else if (errors) {
        Object.entries(errors).forEach(([_, messages]) => {
          (messages as string[]).forEach((msg) => {
            toast.error(msg);
          });
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }

    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      {loading ? <LoadingPage /> :
        <div className="register-page-container">
          <img src={PMSIcon} alt="PMSIcon" className="w-25 ImgSize h-25" />
          <div className="d-flex Register-container g-3 flex-column align-items-center justify-content-center">
            <div className="w-100 px-3 py-3 Register-main-container border-0 shadow-lg">

              <div className="text-lg-start mt-3 mx-5">
                <h2 className="fw-bold d-flex flex-column heading-style">
                  <span className="text-white fw-light sub-heading">welcome to PMS</span>
                  <span className="d-flex align-items-center">
                    <span className="FC">C</span>reate New Account
                  </span>
                </h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="text-center mb-4">
                  <label htmlFor="profileImageInput" className="profile-label">
                    <div className="profile-image-container">
                      {watch("profileImage") && watch("profileImage")?.[0] ? (
                        <img
                          src={URL.createObjectURL(watch("profileImage")![0])}
                          alt="Preview"
                          className="profile-image-preview"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faUser}
                          size="2x"
                          className="profile-icon"
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

                <div className="row px-5">
                  {/* Repeated Form Inputs */}
                  {[
                    { label: "User Name", name: "userName", type: "text", placeholder: "Enter your name", validation: validateRegisterForm.userName },
                    { label: "E-mail", name: "email", type: "email", placeholder: "Enter your E-mail", validation: validateRegisterForm.email },
                    { label: "Country", name: "country", type: "text", placeholder: "Enter your country", validation: validateRegisterForm.country },
                    { label: "Phone Number", name: "phoneNumber", type: "tel", placeholder: "Enter your phone number", validation: validateRegisterForm.phoneNumber },
                  ].map((field, index) => (
                    <div key={index} className="col-12 mb-2 d-flex flex-column col-md-6">
                      <label className="form-label fw-medium input-label">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="form-control bg-transparent text-white custom-input"
                        {...register(field.name as keyof FormDataRegister, field.validation)}
                      />
                      {errors[field.name as keyof FormDataRegister] && (
                        <div className="invalid-feedback d-block">
                          {errors[field.name as keyof FormDataRegister]?.message}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Password */}
                  <div className="col-12 mb-2 d-flex flex-column col-md-6">
                    <label className="form-label fw-medium input-label">Password</label>
                    <div className="position-relative w-100">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your Password"
                        className="form-control bg-transparent text-white custom-input"
                        {...register("password", validateRegisterForm.password)}
                      />
                      <button
                        type="button"
                        className="btn position-absolute top-50 end-0 translate-middle-y me-2 toggle-password-btn"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                      </button>
                    </div>
                    {errors.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password.message}
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="col-12 mb-2 d-flex flex-column col-md-6">
                    <label className="form-label fw-medium input-label">Confirm Password</label>
                    <div className="position-relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm New Password"
                        className="form-control bg-transparent text-white custom-input"
                        {...register("confirmPassword", validateRegisterForm.confirmPassword(password))}
                      />
                      <button
                        type="button"
                        className="btn position-absolute top-50 end-0 translate-middle-y me-2 toggle-password-btn"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <div className="invalid-feedback d-block">
                        {errors.confirmPassword.message}
                      </div>
                    )}
                  </div>

                  <div className="text-end mt-2">
                    <Link to={'/login'} className='links-container_F_R text-decoration-none'>Login Now?</Link>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="d-flex justify-content-center mx-sm-5 mx-lg-0 mt-3">
                  <button
                    type="submit"
                    className="btn btn-lg fw-bold custom-submit-btn"
                    disabled={isSubmitting}
                  >
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

export default Register;
