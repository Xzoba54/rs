import styled from "styled-components";

import { ProductProp } from "../../utils/types";
import { GroupHorizontal, GroupVertical, Hr } from "../../styles/common";

import { IoIosStar } from "react-icons/io";

const Container = styled.div`
  min-width: 500px;
`;
const Header = styled(GroupVertical)`
  margin-top: 1rem;
  align-items: flex-start;
  gap: 8px;
`;
const Name = styled.span`
  font-size: 1.8rem;
  color: #161616;
  font-weight: 500;
  letter-spacing: 0.5px;
`;
const Reviews = styled(GroupHorizontal)`
  gap: 1px;
`;
const ReviewText = styled.span`
  margin-left: 1rem;
  font-size: 13px;
  color: #161616;
`;

const ProductDetails = ({ product }: { product: ProductProp }) => {
  return (
    <Container>
      <Header>
        <Name>{product.name}</Name>

        <Reviews>
          <IoIosStar color="#F7B000" size={16} />
          <IoIosStar color="#F7B000" size={16} />
          <IoIosStar color="#F7B000" size={16} />
          <IoIosStar color="#ccc" size={16} />
          <IoIosStar color="#ccc" size={16} />

          <ReviewText>(332) Opinions</ReviewText>
        </Reviews>
      </Header>

      <Hr />
    </Container>
  );
};

export default ProductDetails;
