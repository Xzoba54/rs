import styled from "styled-components";

import { ProductProp } from "../../utils/types";
import { Link } from "react-router-dom";
import { GroupVertical } from "../../styles/common";

import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";

const Container = styled.div`
  position: relative;
  height: 310px;
  /* width: 230px; */
  width: 200px;

  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 6px;
  transition: 0.2s;

  &:hover {
    border: 1px solid #fff;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);
  }
  &:hover .icon {
    opacity: 1;
    visibility: visible;
  }

  & > div.icon:first-child {
    top: calc(1rem - 5px);
    right: calc(1rem - 5px);
  }
  & > div.icon:nth-child(2) {
    bottom: calc(1rem - 5px);
    right: calc(1rem - 5px);
  }
`;

const Wrapper = styled(Link)`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div`
  display: flex;
  background-color: #fff;
`;
const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Footer = styled(GroupVertical)`
  align-items: flex-start;
  gap: 14px;
`;

const Tag = styled.div`
  padding: 0px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  pointer-events: none;
`;
const TagText = styled.span`
  font-size: 11px;
  font-weight: 400;
  color: #161616;
`;

const IconContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 8px;
  transition: 0.1s;
  opacity: 0;
  visibility: hidden;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const NameContainer = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
`;

const Image = styled.img`
  width: 190px;
  height: 150px;
  object-fit: contain;
  user-select: none;
`;

const Name = styled.span`
  color: #161616;
  font-size: 13px;
  font-weight: 500;
`;
const Price = styled.span`
  color: #3b3b3b;
  font-size: 14px;
  font-weight: 400;
`;
const Discount = styled.span`
  color: #3b3b3b;
  font-size: 12px;
  font-weight: 500;
  text-decoration: line-through;
`;

const Card = ({ product, discount }: { product: ProductProp; discount: boolean }) => {
  return (
    <Container>
      <IconContainer className="icon">
        <CiHeart size={20} color="#161616" />
      </IconContainer>

      <IconContainer className="icon">
        <CiShoppingCart size={20} color="#161616" />
      </IconContainer>

      <Wrapper to={`/product/${product.slug}`}>
        <Header>
          {discount && (
            <Tag>
              <TagText>Sold</TagText>
            </Tag>
          )}
        </Header>

        <Body>
          <Image src={product.images[0]} />
        </Body>

        <Footer>
          <NameContainer>
            <Name>{product.name}</Name>
          </NameContainer>
          <GroupVertical style={{ alignItems: "flex-start" }}>
            <Discount>$200</Discount>
            <Price>${product.price}</Price>
          </GroupVertical>
        </Footer>
      </Wrapper>
    </Container>
  );
};

export default Card;
