import { useEffect, useState } from 'react';
import logoForGet from '../../assets/PMS 3@2x.png';
import { useForm } from 'react-hook-form';
import { axiosInstance, USERS_URLS } from '../../services/Urls';
import { validateRegisterForm } from '../../services/Validations';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import type { ForgetPasswordForm } from '../../interfaces/AuthContextType';
import LoadingPage from '../../shared/LoadingPage/LoadingPage';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // ✅ react-icons

import "../../styles/ForgetPassword.css";

function ForgetPassword() {
  const [userEmail, setUserEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dispalyForm, setDisplayForm] = useState(true);
  const [btnloading, setbtnloading] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ForgetPasswordForm>();
  const password = watch("password");
  const navigate = useNavigate();

  async function handelForgetPassword(data: ForgetPasswordForm) {
    setbtnloading(true);
    try {
      const response = await axiosInstance.post(USERS_URLS.FORGET_PASS, data);
      toast.success(response.data.message || "success, please check your email");
      setDisplayForm(false);
      setUserEmail(data.email);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setbtnloading(false);
    }
  }

  async function updatePassword(data: ForgetPasswordForm) {
    setbtnloading(true);
    try {
      const response = await axiosInstance.post(USERS_URLS.RESET_PASS, data);
      toast.success(response.data.message || "Password updated successfully");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setbtnloading(false);
    }
  }

  useEffect(() => {
    if (userEmail) {
      setValue("email", userEmail);
    }
  }, [userEmail, setValue]);

  return (
    <>
      {btnloading ? (
        <LoadingPage />
      ) : (
        dispalyForm ? (
          <div className="ForgetPassword">
            <div className="container-fluid overlay">
              <div className="row min-vh-100 justify-content-center align-items-center">
                <div className="col-12 col-md-5 rounded-3 py-5">
                  <div className="log_img_forget text-center">
                    <img src={logoForGet} className="w-100" alt="PMS-logo" />
                  </div>
                  <div className="form_forget">
                    <div className="title_forget">
                      <p>welcome to PMS</p>
                      <h2><span>F</span>orget Password</h2>
                    </div>
                    <form onSubmit={handleSubmit(handelForgetPassword)}>
                      <div className="form-group">
                        <label className="input-label">E-mail</label>
                        <input
                          {...register("email", validateRegisterForm.email)}
                          type="email"
                          placeholder="Enter your E-mail"
                          className="form-control custom-input"
                        />
                        {errors.email && (
                          <div className="invalid-feedback d-block">{errors.email.message}</div>
                        )}
                      </div>
                      <button type="submit" className="btn_forget w-100 mt-3">Send</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="ForgetPassword">
            <div className="container">
              <div className="row justify-content-center min-vh-100">
                <div className="col-12 col-md-6 rounded-3 py-5">
                  <div className="log_img_forget text-center">
                    <img src={logoForGet} className="w-100" alt="PMS-logo" />
                  </div>
                  <div className="form_rest">
                    <div className="title_rest">
                      <p>welcome to PMS</p>
                      <h2><span>R</span>eset Password</h2>
                    </div>
                    <form onSubmit={handleSubmit(updatePassword)}>
                      <div className="form-group">
                        <label htmlFor="email" className="input-label">E-mail</label>
                        <input
                          id='email'
                          {...register("email", validateRegisterForm.email)}
                          type="email"
                          className="form-control custom-input"
                          placeholder="Enter your E-mail"
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="OTP" className="input-label">OTP Verification</label>
                        <input
                          id='OTP'
                          {...register("seed", { required: "OTP is required" })}
                          type="text"
                          placeholder="Enter Verification"
                          className="form-control custom-input"
                        />
                      </div>
                      <div className="form-group position-relative">
                        <label htmlFor="password" className="input-label">New Password</label>
                        <input
                          id='password'
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your New Password"
                          className="form-control custom-input"
                          {...register("password", validateRegisterForm.password)}
                        />
                        <button
                          type="button"
                          className="toggle-password-btn position-absolute top-50 end-0 translate-middle-y me-2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash className="text-white" /> : <FaEye className="text-white" />}
                        </button>
                      </div>
                      {errors.password && (
                        <div className="invalid-feedback d-block">{errors.password.message}</div>
                      )}
                      <div className="form-group position-relative">
                        <label htmlFor="Confirmpassword" className="input-label">Confirm Password</label>
                        <input
                          id='Confirmpassword'
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your New Password"
                          className="form-control custom-input"
                          {...register("confirmPassword", validateRegisterForm.confirmPassword(password))}
                        />
                        <button
                          type="button"
                          className="toggle-password-btn position-absolute top-50 end-0 translate-middle-y me-2"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <FaEyeSlash className="text-white" /> : <FaEye className="text-white" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <div className="invalid-feedback d-block">{errors.confirmPassword.message}</div>
                      )}
                      <button type="submit" className="btn_resetPass w-100 mt-3">Send</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}

export default ForgetPassword;
