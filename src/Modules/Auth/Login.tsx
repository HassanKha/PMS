import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/register.css";
import PMSIcon from "../../assets/PMSIcon.png";
import LoginBg from "../../assets/LoginBG.svg";
import axios from "axios";
import { useState } from "react";

type LoginFormInputs = {
  email: string;
  password: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true); 
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3003/api/v1/Users/Login",
        data
      );
      navigate("/dashboard");
      toast.success("Login success!");
      localStorage.setItem("token", response?.data?.token);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Login Failed!";
        toast.error(message);
        console.log("Login Error:", error.response?.data || error.message);
      } else {
        toast.error("Unexpected error");
        console.log("Unexpected Error:", error);
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div
      className="d-flex gap-2 flex-column align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${LoginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <img src={PMSIcon} alt="PMSIcon" className="w-25 ImgSize h-25" />

      <div
        className="Verify-container d-flex flex-column align-items-center justify-content-center px-3 w-100"
        style={{
          maxWidth: "500px",
        }}
      >
        <div className="w-100 py-3 Verify-main-container d-flex flex-column justify-content-lg-start border-0 shadow-lg">
          <div className="text-start mt-5 mx-5">
            <h2
              className="fw-bold d-flex flex-column title-auth"
              style={{
                color: "#ffa726",
                fontSize: "clamp(1.5rem, 5vw, 2.25rem)",
              }}
            >
              <span
                className="text-white fw-light"
                style={{ fontSize: "13px" }}
              >
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
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <div className="invalid-feedback d-block">
                    {errors.email.message}
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="col-12 mb-3 d-flex flex-column">
                <label
                  className="form-label fw-medium"
                  style={{ color: "#ffa726" }}
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="bg-transparent text-white"
                  style={{
                    border: "none",
                    outline: "none",
                    borderBottom: "1px solid white",
                    padding: "6px 12px",
                    color: "white",
                  }}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <div className="invalid-feedback d-block">
                    {errors.password.message}
                  </div>
                )}
              </div>

              <div className="links-container d-flex flex-lg-row flex-column  align-items-center justify-content-between mb-3">
                <Link
                  to="/register"
                  className="text-decoration-none text-white"
                >
                  Register Now?
                </Link>
                <Link
                  to="/forget-pass"
                  className="text-decoration-none text-white"
                >
                  Forget Password?
                </Link>
              </div>
            </div>

            <div className="d-flex justify-content-center mx-sm-5 mx-lg-0 mt-4">
              <button
                type="submit"
                className="btn fw-bold w-100 d-flex align-items-center justify-content-center"
                disabled={loading} 
                style={{
                  maxWidth: "300px",
                  background: "linear-gradient(45deg, #ffa726, #ff9800)",
                  border: "none",
                  borderRadius: "25px",
                  color: "white",
                  fontSize: "18px",
                }}
              >
                {loading ? (
                  <div
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
