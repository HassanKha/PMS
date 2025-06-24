import personData from '../../assets/personData.png';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { axiosInstance, USERS_URLS } from '../../services/Urls.js';
import { toast } from 'react-toastify';
import { validateRegisterForm } from '../../services/Validations.js';
import type { UserPrfoile } from '../../interfaces/UserProfile.js';
import Loader from '../../shared/Loader.js';

export default function Profile() {
  const [dataPersons, setDataPerson] = useState<UserPrfoile | null>(null);
  const [btnLoad, setBtnLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState<boolean>(false)

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<UserPrfoile>();

  async function GetUser() {
    setLoading(true)

    try {
      const response = await axiosInstance.get<UserPrfoile>(USERS_URLS.GET_CURRENT_USER);
      setDataPerson(response.data);
      
    }
    catch (error: any) {
      
      toast.error(error?.response?.data?.message || 'An error occurred');
    }
    finally {
      setLoading(false)
    }
  }

  async function onSubmit(data: UserPrfoile) {
    setBtnLoad(true);
    try {
      const response = await axiosInstance.put(USERS_URLS.UPDATE_CURRENT_PROFILE, data);
      toast.success(response?.data?.message ||'Profile updated successfully.');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Invalid password');
    } finally {
      setBtnLoad(false);
    }
  }

  useEffect(() => {
    GetUser();
  }, []);

  useEffect(() => {
    if (dataPersons) {
      setValue("userName", dataPersons.userName);
      setValue("email", dataPersons.email);
      setValue("country", dataPersons.country);
      setValue("phoneNumber", dataPersons.phoneNumber);
    }
  }, [dataPersons, setValue]);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100 ">
          <Loader />
        </div>
      ) : (
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <div className="input-group mt-3">
                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-user"></i></span>
                    <input
                      {...register('userName', validateRegisterForm.userName)}
                      type="text"
                      className="form-control input_height"
                      placeholder="UserName"
                    />
                  </div>
                  {errors.userName && <span className="text-danger">{errors.userName.message}</span>}
                </div>

                <div>
                  <div className="input-group mt-3">
                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
                    <input
                      {...register('email', validateRegisterForm.email)}
                      type="email"
                      className="form-control input_height"
                      placeholder="Enter your E-mail"
                    />
                  </div>
                  {errors.email && <span className="text-danger">{errors.email.message}</span>}
                </div>


                <div>
                  <div className="input-group mt-3">
                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-earth-americas"></i></span>
                    <input
                      {...register('country', validateRegisterForm.country)}
                      type="text"
                      className="form-control input_height"
                      placeholder="Country"
                    />
                  </div>
                  {errors.country && <span className="text-danger">{errors.country.message}</span>}
                </div>


                <div>
                  <div className="input-group mt-3">
                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-mobile-screen-button"></i></span>
                    <input
                      {...register('phoneNumber', validateRegisterForm.phoneNumber)}
                      type="text"
                      className="form-control input_height"
                      placeholder="PhoneNumber"
                    />
                  </div>
                  {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber.message}</span>}
                </div>
                <div>
                  <div className="input-group mt-3 position-relative">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-lock"></i>
                    </span>

                    <input
                      {...register('confirmPassword', validateRegisterForm.password)}
                      type={show ? "text" : "password"}
                      className="form-control input_height bord_pass pe-5"
                      placeholder="Confirm Password"
                      style={{ zIndex: 1 }}
                    />

                    <span
                      className="position-absolute end-0 top-50 translate-middle-y pe-3 cursor-pointer"
                      style={{ zIndex: 2 }}
                      onClick={() => setShow((prev) => !prev)}
                    >
                      {show ? (
                        <i className="fa-solid fa-eye p-2"></i>
                      ) : (
                        <i className="fa-solid fa-eye-slash p-2"></i>
                      )}
                    </span>
                  </div>

                  {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
                </div>

                <button type="submit" className="btn btn-warning fw-bold text-white mt-3 w-100">
                  {btnLoad ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    "Update"
                  )}
                </button>
              </form>
            </div>

            <div className="col-md-6">
              <div className="img">
                <img src={personData} className="w-100" alt="Profile visual" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}




