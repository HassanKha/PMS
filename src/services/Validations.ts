export const verifyValidation = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  },
  code: {
    required: "OTP is required",
    pattern: {
      value: /^[A-Za-z0-9]{4}$/, // allows 4 digits or letters
      message: "OTP must be 4 letters or digits",
    },
  },
};

export const validateRegisterForm = {
  userName: {
    required: "User name is required",
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  },
  country: {
    required: "Country is required",
  },
  phoneNumber: {
    required: "Phone number is required",
    pattern: {
      value: /^[+]?[\d\s\-]+$/,
      message: "Invalid phone number format",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
  },
  confirmPassword: (password: string) => ({
    required: "Please confirm your password",
    validate: (value: string) =>
      value === password || "Passwords do not match",
  }),
};
