import { useEffect, useRef, useState } from "react";

import { IoIosSearch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

import Dropdown, { DropdownValue, DropdownMenu } from "../dropdown/Dropdown";

import { GroupHorizontal } from "../../styles/common";
import { Container, Input, DropdownContainer, CategoryName, Option, Button } from "./elements";
import { useNavigate } from "react-router-dom";

type CategoryOptionProp = {
  name: string;
};
const categoryOptions: CategoryOptionProp[] = [
  {
    name: "Everywhere",
  },
  {
    name: "Computers",
  },
  {
    name: "Laptops",
  },
  {
    name: "Computer Components",
  },
  {
    name: "Peripherals",
  },
  {
    name: "Consoles",
  },
  {
    name: "Tablets and Phones",
  },
  {
    name: "Audio",
  },
];

const Search = () => {
  const [category, setCategory] = useState<string>(categoryOptions[0].name);
  const [query, setQuery] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        console.log("xd");
        search();
      }
    };

    inputRef.current?.addEventListener("keydown", handle);

    return () => {
      inputRef.current?.removeEventListener("keydown", handle);
    };
  }, [query]);

  const search = () => {
    if (!query?.trim()) return;

    navigate(`/search?=${query.trim()}`);
  };

  return (
    <Container className="shadow-hover">
      <Input placeholder="What are you looking for?" onChange={(e) => setQuery((prev) => e.target.value)} ref={inputRef} />

      <DropdownContainer style={{ zIndex: 2 }}>
        <Dropdown>
          <DropdownValue>
            <GroupHorizontal style={{ gap: "4px" }}>
              <CategoryName>{category}</CategoryName>
              <IoIosArrowDown size={16} color="#161616" className="arrow" />
            </GroupHorizontal>
          </DropdownValue>

          <DropdownMenu style={{ backgroundColor: "#fff" }} className="shadow">
            {categoryOptions.map((option: CategoryOptionProp, index: number) => (
              <Option onClick={() => setCategory(option.name)} className={option.name === category ? "active" : ""} key={index}>
                {option.name}
              </Option>
            ))}
          </DropdownMenu>
        </Dropdown>
      </DropdownContainer>

      <Button onClick={search}>
        <IoIosSearch size={22} color="#fff" />
      </Button>
    </Container>
  );
};

export default Search;
