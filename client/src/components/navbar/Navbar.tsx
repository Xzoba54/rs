import { ReactNode, useState } from "react";

import Logo from "../Logo";
import Search from "../Search/Search";
import Account from "../account/Account";
import Dropdown, { DropdownMenu, DropdownValue } from "../dropdown/Dropdown";

import { GroupHorizontal, GroupVertical, Hr, Layout } from "../../styles/common";

import { CiLaptop, CiShoppingCart, CiDeliveryTruck, CiHeart, CiMonitor, CiUser } from "react-icons/ci";
import { PiCpuThin, PiHeadphonesThin, PiGameControllerThin } from "react-icons/pi";
import { IoIosTabletLandscape } from "react-icons/io";
import { PiSpeakerSimpleHigh } from "react-icons/pi";

import { Container, Topbar, Links, Link, LinkText, Categories, Category, CategoryName, DropdownOption, Burger, MenuContainer, Menu, MediaLink, CategoriesContainer } from "./elements";
import useAuth from "../../hooks/useAuth";

type LinkProp = {
  text: string;
  icon: ReactNode;
};

const linkIconSize = 26;
const linkIconColor = "#161616";
const links: LinkProp[] = [
  {
    text: "Orders",
    icon: <CiDeliveryTruck color={linkIconColor} size={linkIconSize} />,
  },
  {
    text: "Wishlist",
    icon: <CiHeart color={linkIconColor} size={linkIconSize} />,
  },
  {
    text: "Cart",
    icon: <CiShoppingCart color={linkIconColor} size={linkIconSize} />,
  },
];

type CategoryProp = {
  name: string;
  icon: ReactNode;
};

const categoryIconSize = 22;
const categoryIconColor = "#161616";
export const categories: CategoryProp[] = [
  {
    name: "Computers",
    icon: <CiMonitor color={categoryIconColor} size={categoryIconSize} />,
  },
  {
    name: "Laptops",
    icon: <CiLaptop color={categoryIconColor} size={categoryIconSize} />,
  },
  {
    name: "Computer Components",
    icon: <PiCpuThin color={categoryIconColor} size={categoryIconSize} />,
  },
  {
    name: "Peripherals",
    icon: <PiHeadphonesThin color={categoryIconColor} size={categoryIconSize} />,
  },
  {
    name: "Consoles",
    icon: <PiGameControllerThin color={categoryIconColor} size={categoryIconSize} />,
  },
  {
    name: "Tablets and Phones",
    icon: <IoIosTabletLandscape color={categoryIconColor} size={categoryIconSize} />,
  },
  {
    name: "Audio",
    icon: <PiSpeakerSimpleHigh color={categoryIconColor} size={categoryIconSize} />,
  },
];

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const { auth } = useAuth();

  return (
    <Container>
      <Layout>
        <Topbar>
          <GroupHorizontal style={{ gap: "24px" }}>
            <Logo />
            <Search />
          </GroupHorizontal>

          <GroupHorizontal style={{ height: "45px" }}>
            <Links>
              {links.map((link: LinkProp, index: number) => (
                <Link key={index}>
                  <GroupVertical style={{ gap: "2px" }}>
                    {link.icon}
                    <LinkText>{link.text}</LinkText>
                  </GroupVertical>
                </Link>
              ))}
            </Links>

            <Link>
              <Account />
            </Link>

            <Burger onClick={() => setOpenMenu(!openMenu)} className={openMenu ? "active" : ""}>
              <div></div>
            </Burger>

            <MenuContainer className={openMenu ? "active" : ""}>
              <Menu>
                <GroupVertical style={{ alignItems: "flex-start", gap: "4px" }}>
                  {links.map((link: LinkProp, index: number) => (
                    <MediaLink key={index}>
                      {link.icon}
                      <LinkText>{link.text}</LinkText>
                    </MediaLink>
                  ))}

                  <Hr />

                  <MediaLink>
                    <CiUser size={linkIconSize} color={linkIconColor} />
                    <LinkText>{auth ? "My Account" : "Login"}</LinkText>
                  </MediaLink>
                </GroupVertical>
              </Menu>
            </MenuContainer>
          </GroupHorizontal>
        </Topbar>
      </Layout>

      <CategoriesContainer>
        <Categories>
          {categories.map((category: CategoryProp, index: number) => (
            <Dropdown key={index}>
              <Category>
                <DropdownValue>
                  <GroupHorizontal style={{ gap: "4px" }}>
                    {category.icon}
                    <CategoryName>{category.name}</CategoryName>
                  </GroupHorizontal>
                </DropdownValue>
              </Category>

              <DropdownMenu style={{ backgroundColor: "#fff" }} className="shadow">
                <DropdownOption>menu</DropdownOption>
                <DropdownOption>menu</DropdownOption>
              </DropdownMenu>
            </Dropdown>
          ))}
        </Categories>
      </CategoriesContainer>
    </Container>
  );
};

export default Navbar;
