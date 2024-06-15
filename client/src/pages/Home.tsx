import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import styled from "styled-components";

import useAuth from "../hooks/useAuth";
import { AuthJwt, ProductProp } from "../utils/types";
import axios from "../utils/axios";
import Card from "../components/card/Card";
import { GroupHorizontal } from "../styles/common";

const Container = styled.div`
  margin-top: 3rem;
`;
const Slider = styled(GroupHorizontal)`
  gap: 12px;
`;

const Home = () => {
  const [products, setProducts] = useState<ProductProp[] | undefined>();

  const [searchParams] = useSearchParams();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    document.title = "ROTORS";

    if (token) {
      const user: AuthJwt = jwtDecode(token);

      setAuth({
        name: user.name,
        picture: user.picture,
        token: token,
      });

      navigate("/");
    }

    fetchProducts();
  }, [auth]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/product");

      const data = res.data as ProductProp[];

      setProducts(data);
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <Container>
      {products && (
        <Slider>
          {products.map((product: ProductProp, index: number) => (
            <Card product={product} discount={product.producer.name == "intel" ? true : false} key={index} />
          ))}
        </Slider>
      )}
    </Container>
  );
};

export default Home;
