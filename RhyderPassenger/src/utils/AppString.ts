export const AppString = {
  NavigationScreens: {
    auth:{
      UploadDocuments: 'UploadDocuments'
    }
  },
  screens: {
    auth: {
      login: {
        header: 'Login',
        googleButton: 'Continue With Google',
        orText: 'OR',
        emailOrPhoneLabel: 'Email or Phone Number',
        emailOrPhonePlaceholder: 'Enter Email or Phone Number',
        emailOrPhoneError: 'Please enter a correct Email or Phone number',
        passwordLabel: 'Password',
        passwordPlaceholder: 'Enter Password',
        passwordError: 'Please enter your Password',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot Password?',
        loginButton: 'Login',
        noAccount: "Don't have an account?",
        signup: 'Sign Up',
        loginSuccess: 'Login successful',
        loginFailed: 'Invalid username or password',
        forgotPasswordNavigation: 'forgotPassword',
        signupNavigation: 'signup',
      },
      uploadDocuments: {
        title: 'Upload Documents',
        subtitle: 'Upload documents for the vehicle',
        sections: [
          {
            label: 'Photo*',
            uploadText: 'Click to Upload Photo',
            fileType: 'JPG',
            fileSize: 'min-400 kb to max-800 kb',
            id: 'photo',
          },
          {
            label: 'Identity Proof (Passport, National ID card)*',
            uploadText: 'Click to Upload Identity Proof',
            fileType: 'PDF',
            fileSize: 'min-400 kb to max-800 kb',
            id: 'identity',
          },
          {
            label: 'Gender Identity Proof (Transgender)',
            uploadText: 'Click to Upload Gender Identity Proof',
            fileType: 'PDF',
            fileSize: 'min-400 kb to max-800 kb',
            id: 'genderIdentity',
          },
        ],
      },
    },
  },
};
