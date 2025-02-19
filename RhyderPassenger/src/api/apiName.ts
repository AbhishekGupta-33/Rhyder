export const ApiName = {
  auth: {
    sendOtp: '/api/auth/send-otp',
    verifyOtp: '/api/auth/verify-otp',
    register: '/api/auth/register',
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    getProfile: '/api/auth/profile',
    refreshToken: '/api/auth/refresh',
    forgotPassword: '/api/auth/forgot-password',
    verifyPasswordResetOtp: '/api/auth/verify-password-reset-otp',
    resetPassword: '/api/auth/reset-password',
  },
  documents: {
    uploadImage: '/api/documents/upload-image',
    uploadIdentity: (documentType: string) =>
      `/api/documents/upload-identity/${documentType}`,
    getUserImage: '/api/documents/user-image',
    getRequiredDocuments: '/api/documents/required',
    getUploadedDocuments: '/api/documents/uploaded',
    deleteImage: (documentId: string) => `/api/documents/image/${documentId}`,
  },
};
