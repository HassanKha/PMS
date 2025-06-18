export interface FormData {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }

 export interface FormDataRegister {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  profileImage?: FileList; // or FileList | null depending on your logic
}


export interface FormDataVerify  {
  email: string;
  code: string;
};
