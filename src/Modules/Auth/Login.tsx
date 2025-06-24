import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Login.css";
import PMSIcon from "../../assets/PMSIcon.png";
import LoginBg from "../../assets/LoginBG.svg";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { validateRegisterForm } from "../../services/Validations";
import type { LoginFormInputs } from "../../interfaces/LoginFormInputs";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingPage from "../../shared/LoadingPage/LoadingPage";
import { axiosInstance, USERS_URLS } from "../../services/Urls";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(USERS_URLS.LOGIN, data);
      toast.success(response?.data?.message || "Login successful");
      localStorage.setItem("token", response?.data?.token);
      navigate("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Login Failed!";
        toast.error(message);
      } else {
        toast.error( "Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!auth?.LoginData) {
      navigate("/");
    }
  }, [auth?.LoginData, navigate]);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div
          className="d-flex gap-2 flex-column align-items-center justify-content-center login-bg"
          style={{ backgroundImage: `url(${LoginBg})` }}
        >
          <img src={PMSIcon} alt="PMSIcon" className="w-25 ImgSize h-25" />

          <div className="Verify-container d-flex flex-column align-items-center justify-content-center px-3 w-100 login-container">
            <div className="w-100 py-3 Verify-main-container d-flex flex-column justify-content-lg-start border-0 shadow-lg">
              <div className="text-start mt-5 mx-5">
                <h2 className="fw-bold d-flex flex-column title-auth">
                  <span className="text-white fw-light text-start subtitle-auth">
                    Welcome to PMS
                  </span>
                  <span className="d-flex align-items-center">
                    <span className="FC">L</span>ogin
                  </span>
                </h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex mt-3 mx-5 justify-content-lg-center justify-content-start align-content-lg-center flex-column">
                  {/* Email */}
                  <div className="col-12 mb-3 d-flex flex-column">
                    <label htmlFor="email" className="form-label fw-medium input-label">
                      E-mail
                    </label>
                    <input
                    id="email"
                      type="email"
                      placeholder="Enter your E-mail"
                      className="login-input"
                      {...register("email", {
                        required: "Email is required",
                      })}
                    />
                    {errors.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email.message}
                      </div>
                    )}
                  </div>

                  {/* Password */}
                  <div className="input-group mt-3">
                    <label htmlFor="password" className="form-label fw-medium input-label">
                      Password
                    </label>
                    <div className="position-relative col-12 w-100">
                      <input
                      id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your Password"
                        className="login-password-input"
                        {...register(
                          "password",
                          validateRegisterForm.password
                        )}
                      />

                      <button
                        type="button"
                        className="btn position-absolute top-50 end-0 translate-middle-y me-2 password-toggle-btn"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                        />
                      </button>
                    </div>

                    <div
                      className="w-100"
                      style={{ height: "1px", background: "white" }}
                    ></div>
                    {errors.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password.message}
                      </div>
                    )}
                  </div>

                  {/* Links */}
                  <div className="links-container d-flex justify-content-between mb-3 mt-2">
                    <Link
                      to="/register"
                      className="text-decoration-none links-container_F_R text-white"
                    >
                      Register Now?
                    </Link>
                    <Link
                      to="/forget-password"
                      className="text-decoration-none links-container_F_R text-white"
                    >
                      Forget Password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <div className="d-flex justify-content-center mx-sm-5 mx-lg-0 mt-4">
                    <button
                      type="submit"
                      className="btn fw-bold login-submit-btn d-flex align-items-center justify-content-center"
                      disabled={loading}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
