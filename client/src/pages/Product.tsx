import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import axios from "../utils/axios";
import { ProductProp } from "../utils/types";

import { GroupHorizontal, GroupVertical } from "../styles/common";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import Loading from "../components/loading/Loading";

import Location from "../components/Location/Location";

const Container = styled(GroupHorizontal)`
  //temp
  margin-top: 3rem;

  width: 100%;
  gap: 4rem;
  /* justify-content: space-between; */
  justify-content: center;
  align-items: flex-start;
`;

const ProductImages = styled(GroupVertical)`
  gap: 8px;
`;
const ProductImage = styled.img`
  width: 600px;
  height: 440px;
  object-fit: contain;
  border-radius: 6px;
`;
const Slider = styled(GroupHorizontal)`
  gap: 4px;
`;
const SliderItem = styled.div`
  width: 80px;
  height: 70px;
  border-radius: 6px;
  padding: 4px;
  border: 1px solid #ccc;
  transition: 0.1s;

  &:hover,
  &.active {
    border: 1px solid #868686;
  }
`;
const SliderImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;

const Product = () => {
  const [product, setProduct] = useState<ProductProp | undefined>();
  const [error, setError] = useState<boolean>(false);

  const [productImage, setProductImage] = useState<string>("");
  const { slug } = useParams();

  useEffect(() => {
    fetchData();
  }, [slug]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/product/${slug}`);
      const data = res.data as ProductProp;

      document.title = data.name;

      setProduct(data);
      setProductImage(data.images[0]);
    } catch (e: any) {
      console.log(e);
      setError(true);
    }
  };

  return (
    <>
      {product ? (
        <>
          <Location
            locations={[
              { name: "Home", link: "/" },
              { name: product.category.name, link: `/category/${product.category.name}` },
              { name: product.name, link: `/product/${product.slug}` },
            ]}
          />

          <Container>
            <ProductImages>
              <ProductImage src={productImage} />

              <Slider>
                {product.images.map((image: string, index: number) => (
                  <SliderItem className={image === productImage ? "active" : ""} onMouseEnter={() => setProductImage(image)} key={index}>
                    <SliderImg src={image} />
                  </SliderItem>
                ))}
              </Slider>
            </ProductImages>

            <ProductDetails product={product} />
          </Container>
        </>
      ) : (
        <Loading error={error} />
      )}
    </>
  );
};

export default Product;
