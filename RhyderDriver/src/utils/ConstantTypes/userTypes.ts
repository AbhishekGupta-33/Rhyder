// Profile Response
export type ProfileDataResponse = {
  id: number | string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  roleId: number | string;
};
