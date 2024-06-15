import { ReactNode } from "react";
import styled from "styled-components";

type ContainerProps = {
  color?: string;
};

const Container = styled.div<ContainerProps>`
  position: relative;
  border-radius: 6px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;

  &:hover > div:last-child,
  &:hover::after,
  &:hover > div > div::after {
    opacity: 1;
    visibility: visible;
  }

  &:hover .arrow {
    transform: rotate(180deg);
    transition: 0.1s;
  }
  &:hover {
    background-color: ${({ color }) => (color ? color : "#fff")};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5.5px;
    background-color: ${({ color }) => (color ? color : "#fff")};
    visibility: hidden;
    transition: 0.1s;
    opacity: 0;
    z-index: 2;
  }
`;

export const DropdownValue = styled.div`
  position: relative;
  padding: 6px 8px;
  cursor: default;
  user-select: none;
`;

export const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0.5rem;
  min-width: 120%;
  cursor: default;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border-top-right-radius: 6px;
  position: absolute;
  visibility: hidden;
  transition: 0.1s;
  opacity: 0;
`;

interface Props {
  children?: ReactNode[] | ReactNode;
  color?: string;
}

const Dropdown = ({ children, color }: Props) => {
  return (
    <Container color={color} className="shadow-hover">
      {children}
    </Container>
  );
};

export default Dropdown;
