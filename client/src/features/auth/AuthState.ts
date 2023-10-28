interface UserType {
  email: string;
  name: string;
  role: string;
  token: string;
  _id: string;
}
interface AuthState {
  user: UserType;
}
export interface RootState {
  auth: AuthState;
}
