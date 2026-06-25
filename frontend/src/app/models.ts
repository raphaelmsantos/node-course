export interface Post {
  _id: string;
  name: string;
  description: string;
  age: number;
}

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
}
