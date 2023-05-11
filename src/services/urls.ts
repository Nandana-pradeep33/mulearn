export const onboardingRoutes = {
  collegeList: "/api/v1/register/register/college/list/",
  companyList: "/api/v1/register/register/company/list/",
  roleList: "/api/v1/register/register/role/list/",
  areaOfInterestList: "/api/v1/register/register/area-of-interest/list/",
  communityList: "/api/v1/register/register/community/list/",
  register: "/api/v1/register/register/",
  emailVerification: "/api/v1/register/email-verification/",
};

export const authRoutes = {
  forgetPassword: "/api/v1/register/forgot-password/",
  login: "/api/v1/auth/user-authentication/",
  getMuid: "/api/v1/register/reset-password/verify-token/${token}/",
  resetPassword: "/api/v1/register/reset-password/${token}/",
  getAccessToken: "/api/v1/auth/get-access-token/",
  requestEmailOtp: "/api/v1/auth/request-email-otp/",
  requestMuidOtp: "/api/v1/auth/request-muid-otp/",
  otpVerification: "/api/v1/auth/otp-verification/",
};

export const dashboardRoutes = {
  getInfo: "/api/v1/register/info/",
};