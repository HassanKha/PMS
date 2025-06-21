import { useEffect, useState } from 'react'
import logoForGet from '../../assets/PMS 3@2x.png'
import { useForm } from 'react-hook-form'
import { axiosInstance, USERS_URLS } from '../../services/Urls';
import { validateRegisterForm } from '../../services/Validations';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import type { ForgetPasswordForm } from '../../interfaces/ForgetPasswordForm';
import LoadingPage from './../../shared/LoadingPage/LoadingPage';




function ForgetPassword() {
  let [userEmail, setUserEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dispalyForm, setDisplayForm] = useState(true)
  let [btnloading, setbtnloading] = useState(false);
  let { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ForgetPasswordForm>();
  let navigate = useNavigate()
  const password = watch("password");

  async function handelForgetPassword(data: any) {

    setbtnloading(true);

    try {
      let response = await axiosInstance.post(USERS_URLS.FORGET_PASS, data)

      toast.success(response.data.message || "success,please check your email");
      setbtnloading(false);
      setDisplayForm(false)
      setUserEmail(data.email);
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong. Please try again.");
      setbtnloading(false);
    }
  }
  async function updatePassword(data: any) {
    setbtnloading(true);
    try {
      let response = await axiosInstance.post(USERS_URLS.RESET_PASS, data)
      console.log(response.data.message);
      toast.success(response.data.message || "password updated successfully");
      navigate("/login")
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong. Please try again.");
    }
    finally {
      setbtnloading(false);
    }
  }
  useEffect(() => {
    if (userEmail) {
      setValue('email', userEmail);
    }
  }, [userEmail, setValue]);

  return (
    <>
    {btnloading?<LoadingPage/>:<>
     {dispalyForm ?
        <div className="ForgetPassword" >
          <div className="container-fluid overlay">
            <div className="row min-vh-100 justify-content-center align-items-center">
              <div className="col-12 col-md-6 rounded-3 py-5 ">
                <div>
                  {/* /logoimg/ */}
                  <div className="log_img_forget text-center ">
                    <img src={logoForGet} className='w-100' alt="food-logo" />
                  </div>
                  <div className="form_forget">
                    {/* /title/ */}
                    <div className="title_forget">
                      <p >welcome to PMS</p>
                      <h2><span>F</span>orget Password</h2>
                    </div>
                    {/* /form/ */}
                    <form onSubmit={handleSubmit(handelForgetPassword)} >
                      {/* /email/ */}
                      <div className="input-group mt-3">
                        <p style={{
                          color: '#EF9B28',
                          fontSize: '13px',
                          marginBottom: '4px',
                          marginLeft: '5px'
                        }}>
                          E-mail
                        </p>
                        <input
                          {...register("email", validateRegisterForm.email)}
                          type="email"
                          placeholder="Enter your E-mail"
                          className="bg-transparent text-white w-100"
                          style={{
                            border: "none",
                            outline: "none",
                            borderBottom: "1px solid white",
                            padding: "6px 12px",
                            color: "white",
                          }}
                        />
                      </div>
                      <button type="submit" className=' btn_forget w-100 '>Send </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> :

        <div className="ForgetPassword">
          <div className="container " >
            <div className="row justify-content-center min-vh-100  ">
              <div className="col-12 col-md-6 rounded-3 py-5 ">
                <div>
                  {/* /logoimg/ */}
                  <div className="log_img_forget text-center ">
                    <img src={logoForGet} className='w-100' alt="pms-logo" />
                  </div>
                  <div className="form_rest">
                    {/* /title/ */}
                    <div className="title_rest">
                      <p >welcome to PMS</p>
                      <h2><span>R</span>eset  Password</h2>
                    </div>
                    {/* /form/ */}
                    <form onSubmit={handleSubmit(updatePassword)} >
                      {/* /email/ */}
                      <div className="input-group mt-3">
                        <p style={{
                          color: '#EF9B28',
                          fontSize: '13px',
                          marginBottom: '4px',
                          marginLeft: '5px'
                        }}>
                          E-mail
                        </p>
                        <input
                          {...register("email", validateRegisterForm.email)}
                          type="email"
                          placeholder="Enter your E-mail"
                          className="bg-transparent text-white w-100"
                          style={{
                            border: "none",
                            outline: "none",
                            borderBottom: "1px solid white",
                            padding: "6px 12px",
                            color: "white",
                          }}
                          readOnly
                        />
                      </div>
                      {/* /otp/ */}
                      <div className="input-group mt-3">
                        <p style={{
                          color: '#EF9B28',
                          fontSize: '13px',
                          marginBottom: '4px',
                          marginLeft: '5px'
                        }}>
                          OTP Verification
                        </p>
                        <input
                          {...register("seed", { required: "OTP is required" })}
                          type="text"
                          placeholder="Enter Verification"
                          className="bg-transparent text-white w-100"
                          style={{
                            border: "none",
                            outline: "none",
                            borderBottom: "1px solid white",
                            padding: "6px 12px",
                            color: "white",
                          }}
                        />
                      </div>

                      {/* password */}
                      <div className="input-group mt-3">
                        <p style={{
                          color: '#EF9B28',
                          fontSize: '13px',
                          marginBottom: '4px',
                          marginLeft: '5px'
                        }}>
                          New Password
                        </p>
                        <div
                          className="position-relative col-12  w-100"
                          style={{
                            width: "100%",
                          }}
                        >
                          <input
                            type={showPassword ? "text" : "password"}
                            className="w-100"

                            placeholder="Enter your New Password"
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
                            {...register("password", validateRegisterForm.password)}
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



                      {/* confirmPassword */}
                      <div className="input-group mt-3">
                        <p style={{
                          color: '#EF9B28',
                          fontSize: '13px',
                          marginBottom: '4px',
                          marginLeft: '5px'
                        }}>
                          New Password
                        </p>
                        <div
                          className="position-relative col-12  w-100"
                          style={{
                            width: "100%",
                          }}
                        >
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="w-100"
                            placeholder="Enter your New Password"
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
                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
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

                      <button type="submit" className=' btn_resetPass w-100 '>Send </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </>}
     
    </>
  )
}

export default ForgetPassword