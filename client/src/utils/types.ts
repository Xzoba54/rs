import { JwtPayload } from "jwt-decode";

export interface AuthJwt extends JwtPayload {
  name: string;
  picture: string;
}

export interface ProductProp {
  name: string;
  slug: string;
  images: string[];
  stock: number;
  price: number;
  category: {
    name: string;
  };
  producer: {
    name: string;
  };
}
