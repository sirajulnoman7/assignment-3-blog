export type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TUser = {
  name: TName;
  email: string;
  contactNo: string;
  password: string;
  role: 'admin' | 'user';
  profileImage?: string;
  isBlocked: boolean;
};

export default TUser;
