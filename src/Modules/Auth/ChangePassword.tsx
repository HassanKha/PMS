import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import changePassBg from "../../assets/ChangePassBg.svg";
import PMSIcon from "../../assets/PMSIcon.png";
import { validateRegisterForm } from "../../services/Validations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { axiosInstance, USERS_URLS } from '../../services/Urls';
import "../../styles/ChangePass.css";
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import type { FormData } from '../../interfaces/FormData';
import LoadingPage from '../../shared/LoadingPage/LoadingPage';


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
  } = useForm<FormData>();

  const newPassword = watch("newPassword");
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      let response = await axiosInstance.put(USERS_URLS.CHANGE_PASS, data);
      toast.success(response?.data?.message||"Password Changed Successfully");
      navigate("/dashboard");
    } catch (error) {
     toast.error("Failed to change password");
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <>
<div className='change-password'>
           {isLoading?<LoadingPage/>:  
      <div
      className="d-flex gap-2 flex-column align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${changePassBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img src={PMSIcon} alt="PMSIcon" className="lg:w-25 ImgSize  lg:h-25" />
      <div className="d-flex container-fl g-3 flex-column align-items-center justify-content-center">
        <div className="w-75  mx-auto px-3 py-3 change-pass-main-container border-0 shadow-lg">
          <div className="text-lg-start mt-3 mx-5">
            <h2 className="fw-bold d-flex flex-column welcome" >
              <span className="text-white fw-light">welcome to PMS</span>
              Change Password
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row  px-5">


              {/* Old Password */}
              <div className="col-12 mb-3 d-flex flex-column">
                <label className="form-label fw-medium">
                  Old Password
                </label>
                <div className="position-relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Enter your Old Password"
                    className='change-pass-input bg-transparent text-white'
                    {...register("oldPassword", validateRegisterForm.password)}
                    
                  />
                  <Button
                    type="button"
                    className="btn border-0 bg-transparent toggle-password-btn position-absolute top-50 end-0 translate-middle-y me-2"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                   
                  >
                    <FontAwesomeIcon icon={showOldPassword ? faEyeSlash : faEye} />
                  </Button>
                </div>
               
                {errors.oldPassword && (
                  <div className="invalid-feedback d-block">{errors.oldPassword.message}</div>
                )}
              </div>

              {/* New Password */}
              <div className="col-12 mb-3 d-flex flex-column">
                <label className="form-label fw-medium">
                  New Password
                </label>
                <div className="position-relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter your New Password"
                    {...register("newPassword", validateRegisterForm.password)}
                    className='change-pass-input bg-transparent text-white'
                  />
                  <Button
                    type="button"
                    className="btn border-0 bg-transparent toggle-password-btn position-absolute top-50 end-0 translate-middle-y me-2"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                   
                  >
                    <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                  </Button>
                </div>
               
                {errors.newPassword && (
                  <div className="invalid-feedback d-block">{errors.newPassword.message}</div>
                )}
              </div>

              {/* Confirm New Password */}
              <div className="col-12 mb-3 d-flex flex-column">
                <label className="form-label fw-medium">
                  Confirm New Password
                </label>
                <div className="position-relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your New Password"
                    {...register("confirmNewPassword", validateRegisterForm.confirmPassword(newPassword))}
                    className='change-pass-input bg-transparent text-white'
                  />
                  <Button
                    type="button"
                    className="btn border-0 bg-transparent toggle-password-btn position-absolute top-50 end-0 translate-middle-y me-2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                   
                  >
                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                  </Button>
                </div>
              
                {errors.confirmNewPassword && (
                  <div className="invalid-feedback d-block">{errors.confirmNewPassword.message}</div>
                )}
              </div>

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

            <div className="w-100 d-flex justify-content-center align-items-center m-3">

            </div>
          </form>
        </div>
      </div>
    </div>}
    
</div>
   
    </>
  
  );
}

export default ChangePassword;