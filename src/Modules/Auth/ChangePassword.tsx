import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PMSIcon from "../../assets/PMSIcon.png";
import { validateRegisterForm } from "../../services/Validations";
import { axiosInstance, USERS_URLS } from '../../services/Urls';
import "../../styles/ChangePass.css";
import { toast } from 'react-toastify';
import type { FormDataCahangePassword } from '../../interfaces/AuthContextType';
import LoadingPage from '../../shared/LoadingPage/LoadingPage';
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

function ChangePassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormDataCahangePassword>();

  const newPassword = watch("newPassword");
  const navigate = useNavigate();

  const onSubmit = async (data: FormDataCahangePassword) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put(USERS_URLS.CHANGE_PASS, data);
      toast.success(response?.data?.message || "Password Changed Successfully");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='change-password'>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="d-flex gap-2 flex-column align-items-center justify-content-center change-pass-bg">
          <img src={PMSIcon} alt="PMSIcon" className="ImgSize" />
          <div className="d-flex container-fl g-3 flex-column align-items-center justify-content-center">
            <div className="w-75 mx-auto px-3 py-3 change-pass-main-container border-0 shadow-lg">
              <div className="text-lg-start mt-3 mx-5">
                <h2 className="fw-bold d-flex flex-column welcome">
                  <span className="text-white fw-light welcome-sub">Welcome to PMS</span>
                  Change Password
                </h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row px-5">

                  {/* Old Password */}
                  <div className="col-12 mb-3 d-flex flex-column">
                    <label htmlFor="oldPassword" className="form-label fw-medium">
                      Old Password
                    </label>
                    <div className="position-relative">
                      <input
                        id="oldPassword"
                        type={showOldPassword ? "text" : "password"}
                        placeholder="Enter your Old Password"
                        className='change-pass-input bg-transparent text-white'
                        {...register("oldPassword", validateRegisterForm.password)}
                      />
                      <button
                        type="button"
                        className="btn border-0 bg-transparent toggle-password-btn position-absolute top-50 end-0 translate-middle-y me-2"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                      >
                        {showOldPassword ? <FaEyeSlash className="text-white" /> : <FaEye className="text-white" />}
                      </button>
                    </div>
                    {errors.oldPassword && (
                      <div className="invalid-feedback d-block">{errors.oldPassword.message}</div>
                    )}
                  </div>

                  {/* New Password */}
                  <div className="col-12 mb-3 d-flex flex-column">
                    <label htmlFor="newPassword" className="form-label fw-medium">
                      New Password
                    </label>
                    <div className="position-relative">
                      <input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter your New Password"
                        {...register("newPassword", validateRegisterForm.password)}
                        className='change-pass-input bg-transparent text-white'
                      />
                      <button
                        type="button"
                        className="btn border-0 bg-transparent toggle-password-btn position-absolute top-50 end-0 translate-middle-y me-2"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <FaEyeSlash className="text-white" /> : <FaEye className="text-white" />}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <div className="invalid-feedback d-block">{errors.newPassword.message}</div>
                    )}
                  </div>

                  {/* Confirm New Password */}
                  <div className="col-12 mb-3 d-flex flex-column">
                    <label htmlFor="confirmNewPassword" className="form-label fw-medium">
                      Confirm New Password
                    </label>
                    <div className="position-relative">
                      <input
                        id="confirmNewPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your New Password"
                        {...register("confirmNewPassword", validateRegisterForm.confirmPassword(newPassword))}
                        className='change-pass-input bg-transparent text-white'
                      />
                      <button
                        type="button"
                        className="btn border-0 bg-transparent toggle-password-btn position-absolute top-50 end-0 translate-middle-y me-2"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <FaEyeSlash className="text-white" /> : <FaEye className="text-white" />}
                      </button>
                    </div>
                    {errors.confirmNewPassword && (
                      <div className="invalid-feedback d-block">{errors.confirmNewPassword.message}</div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-lg fw-bold mt-4 change-pass-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Changing Password...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChangePassword;
