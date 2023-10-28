interface Application {
  userId: string;
  name: string;
  contactInfo: string;
  experience: string;
  _id: string;
}
export interface Job {
  _id: string;
  title: string;
  description: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  pay: number;
  date: string;
  user: string;
  status: string;
  applications: Application[];
  __v: number;
}
