export  interface ForgetPasswordForm {
      email: string;
      seed?: string; // for OTP
      password?: string;
      confirmPassword?: string;
    };
