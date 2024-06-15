import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 6px;
  width: 460px;
  transition: 0.1s;
  z-index: 1;

  &:hover {
    background-color: #fff;
  }

  @media screen and (max-width: 1200px) {
    width: 340px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export const Input = styled.input`
  width: 100%;
  background-color: transparent;
  margin: 0 18px;
  font-size: 12px;
  color: #161616;
  font-weight: 400;
  letter-spacing: 0.3px;
  border: none;

  @media screen and (max-width: 1200px) {
    margin: 0 12px;
  }
`;

export const DropdownContainer = styled.div`
  padding: 0 4px;
  border-left: 1px solid #ccc;
`;

export const CategoryName = styled.span`
  color: #3b3b3b;
  font-size: 12px;
  font-weight: 400;
  z-index: 3;
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const Option = styled.span`
  padding: 0.4rem 0.6rem;
  font-size: 11px;
  color: #161616;
  white-space: nowrap;
  border-radius: 6px;
  transition: 0.1s;

  &:hover,
  &.active {
    background-color: #f2f2f2;
  }
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  min-width: 40px;
  background-color: #292929;
  color: #fff;
  border-radius: 6px;

  &:hover {
    transition: 0.1s;
    background-color: #363636;
  }

  @media screen and (max-width: 1200px) {
    height: 34px;
    min-width: 34px;
  }
`;
