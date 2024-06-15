interface IUser {
  id: String;
  email: String;
  password?: String;
  name: String;
  picture: String;
  provider: String;
  created_at: Date;
}

interface Jwt {
  id: String;
  name: String;
  picture: String;
}

export { IUser, Jwt };
