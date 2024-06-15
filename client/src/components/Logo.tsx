import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled(Link)`
  padding: 1rem;

  @media screen and (max-width: 768px) {
    padding: 0.2rem;
  }
`;
const Text = styled.div`
  font-weight: 500;
  color: #161616;
  font-size: 2.4rem;
  user-select: none;

  @media screen and (max-width: 1200px) {
    font-size: 1.6rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.9rem;
  }
`;

const Logo = () => {
  return (
    <Container to="/">
      <Text>ROTORS</Text>
    </Container>
  );
};

export default Logo;
