import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem 2rem;
  width: 100%;
  display: flex;
`;
const LocationContainer = styled.div`
  display: flex;
  padding: 2px;
`;
const Wrapper = styled(Link)`
  display: flex;

  & span:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
const Name = styled.span`
  margin: 0px 2px;
  font-size: 13px;
  color: #161616;
  text-transform: capitalize;
  cursor: default;
`;

type LocationProps = {
  name: string;
  link: string;
};

const Location = ({ locations }: { locations: LocationProps[] }) => {
  return (
    <Container>
      {locations.map((location: LocationProps, index: number) => (
        <LocationContainer key={index}>
          <Wrapper to={location.link}>
            <Name>{location.name}</Name>
          </Wrapper>
          {index + 1 != locations.length && <Name>/</Name>}
        </LocationContainer>
      ))}
    </Container>
  );
};

export default Location;
