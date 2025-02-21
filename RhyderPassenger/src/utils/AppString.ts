export const AppString = {
  NavigationScreens: {
    auth: {
      UploadDocuments: 'UploadDocuments',
      Welcome: 'welcome',
      Login: 'login',
      SignupStep1: 'signupStep1',
      SignupStep2: 'signupStep2',
      ForgotPassword: 'forgotPassword',
      SignupVerification: 'signupVerification',
      CreatePassword: 'createPassword'
    },
    user:{
      Home:'home'
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
      signupStep1: {
        header: 'Get started',
        phoneNumberLabel: 'Phone Number',
        phoneNumberPlaceholder: 'Enter Phone Number',
        phoneNumberError: 'Please enter a correct Phone number',
        signupButton: 'Sign Up',
        haveAccount: 'Have an account?',
        loginButton: 'Login Here',
      },
      signupStep2: {
        header: 'Sign Up',
        headerDescription:
          'Please fill in the following details to create your account with RHYDER',
        firstNameLabel: 'First Name*',
        firstNamePlaceholder: 'Enter First Name',
        firstNameError: 'Please enter your First name',
        lastNameLabel: 'Last Name*',
        lastPlaceholder: 'Enter Last Name',
        lastNameError: 'Please enter your Last name',
        phoneLabel: 'Phone*',
        phonePlaceholder: 'Enter Phone Number',
        phoneNumberError: 'Please enter a correct Phone number',
        emailLabel: 'Email*',
        emailPlaceholder: 'Enter Email',
        emailError: 'Please enter your email',
        passwordLabel: 'Password*',
        passwordPlaceholder: 'Enter Password',
        passwordError: 'Please enter your Password',
        confirmationText:
          'By checking this checkbox I confirm I am a woman by gender',
        signUpButton: 'Sign Up',
      },
      signupVerification: {
        header: 'OTP Verify',
        subheader: 'Please enter the verification code sent to',
        otpLabel: 'Enter 6-Digits OTP',
        resendButton: 'Resend OTP',
        verifyButton: 'Verify',
        otpError: 'Please enter OTP',
      },
      signupSuccessModal: {
        title: 'Thankyou for the registration',
        subTitle:
          'We have received your details. also we have sent verification mail',
        okButton: 'OK',
      },
      uploadDocuments: {
        title: 'Upload Documents',
        subtitle: 'Upload documents for the vehicle',
        nextButton: 'NEXT',
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
        docDeleteSuccess: 'Document delete successfully.'
      },
      forgotPassword: {
        header: 'Forgot Password',
        subHeader:
          'Change your password by entering your email or contact number',
        resetButton: 'Send Reset Password Link',
        emailOrPhoneNumberLabel: 'Email or Phone Number',
        emailOrPhoneNumberPlaceholder: 'Enter email or phone number',
        emailOrPhoneNumberError: 'Please enter email or phone number',
      },
      createPassword: {
        header: 'Create Password',
        passwordLabel: 'Password',
        passwordPlaceholder: 'Enter password',
        passwordError: 'Please enter password',
        confirmPasswordLabel: 'Confirm Password',
        confirmPasswordPlaceholder: 'Enter confirm password',
        confirmPasswordError: 'Password not match',
        resetButton: 'Reset Password',
      },
      welcome: {
        header1: `Let's Ride With`,
        header2: 'RHYDER',
        subHedder:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        signupButton: 'Sign Up',
        loginButton: 'Login',
      },
    },
  },
};
