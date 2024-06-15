import styled from "styled-components";

import { GroupHorizontal } from "../../styles/common";

export const Container = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 155px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;

  & > div {
    margin-top: 0;
  }
`;

export const Topbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  width: 100%;

  @media screen and (max-width: 768px) {
    padding: 1rem 1.5rem;
    height: 80px;
    gap: 12px;

    & > div:first-child {
      width: 100%;
    }
  }
`;

export const Links = styled(GroupHorizontal)`
  gap: 12px;
  margin-right: 4rem;
  height: 45px;

  @media screen and (max-width: 1200px) {
    gap: 6px;
    margin-right: 1rem;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const Link = styled.div`
  padding: 1rem;
  min-width: 80px;
  border-radius: 6px;
  cursor: default;
  transition: 0.1s;

  &:hover {
    background-color: #f2f2f2;
  }

  @media screen and (max-width: 1200px) {
    padding: 10px;
    min-width: 40px;
    min-height: 40px;

    & svg {
      width: 22px;
    }
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const MediaLink = styled(GroupHorizontal)`
  width: 100%;
  gap: 8px;
  padding: 0.8rem 1rem;
  border-radius: 6px;
  transition: 0.1s;

  &:hover {
    background-color: #f2f2f2;
  }
`;

export const LinkText = styled.span`
  font-size: 12px;
  color: #3b3b3b;
  font-weight: 400;
  cursor: default;

  @media screen and (max-width: 1200px) {
    display: none;
  }

  @media screen and (max-width: 768px) {
    display: block;
    font-size: 1rem;
  }
`;

export const CategoriesContainer = styled.div`
  width: 100%;
  background-color: #f2f2f2;
  padding: 4px;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 1200px) {
    display: none;
  }

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export const Categories = styled(GroupHorizontal)`
  overflow-x: scroll;
  overflow-y: hidden;
  overflow: visible;
  scrollbar-width: none;
  margin: 0;
  padding: 0;
  list-style: none;
  gap: 1rem;
`;

export const Category = styled.div`
  padding: 0.2rem 0.4rem;
  border-radius: 6px;
  cursor: default;
  transition: 0.1s;

  &:hover {
    background-color: #fff;
  }

  @media screen and (max-width: 1200px) {
    & {
      padding: 0.2rem;
    }

    svg {
      width: 18px;
    }
  }

  @media screen and (max-width: 768px) {
    svg {
      width: 24px;
    }
  }
`;

export const CategoryName = styled.span`
  font-size: 12px;
  color: #161616;
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    font-size: 13px;
  }
`;

export const DropdownOption = styled.div`
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

export const MenuContainer = styled.div`
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  visibility: hidden;

  &.active {
    visibility: visible;
  }
  &.active > div {
    translate: 0 0px;
  }

  @media screen and (min-width: 768px) {
    visibility: hidden !important;
  }
`;

export const Menu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 100%;
  padding: 1rem;
  transition: 0.7s cubic-bezier(0.19, 1, 0.22, 1);
  translate: -100vw 0;

  & svg {
    width: 28px;
    height: 28px;
  }
`;

export const Burger = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(32px + 6px * 2);
  height: calc(2px * 3 + 10px * 2 + 6px * 2);
  visibility: hidden;

  @media screen and (max-width: 768px) {
    visibility: visible;
  }

  & div {
    width: 32px;
    height: 2px;
    background-color: #161616;
  }

  & div::before,
  & div::after {
    content: "";
    position: absolute;
    width: 32px;
    height: 2px;
    background-color: #161616;
    transition: 0.2s;
  }

  & div::before {
    transform: translateY(-10px);
  }

  & div::after {
    transform: translateY(10px);
  }

  &.active {
    & div::before {
      transform: rotate(45deg);
    }

    & div {
      background-color: transparent;
    }

    & div::after {
      transform: rotate(-45deg);
    }
  }
`;
