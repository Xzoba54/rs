import styled from "styled-components";

import useAuth from "../../hooks/useAuth";
import axios from "../../utils/axios";
import { AuthJwt } from "../../utils/types";
import { jwtDecode } from "jwt-decode";

import { CiUser } from "react-icons/ci";

import { GroupHorizontal } from "../../styles/common";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;
`;
const Avatar = styled.img`
  width: 38px;
  border-radius: 50%;
  object-fit: cover;

  @media screen and (max-width: 1200px) {
    width: 30px;
    height: 30px;
  }
`;
const LoginText = styled.span`
  color: #161616;
  font-size: 14px;
  font-weight: 400;

  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

const Account = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const loginWithEmail = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/loginWithEmail", { email: "przemek@gmail.com", password: "pwdd" });

      const { accessToken } = res.data;

      if (accessToken) {
        const user: AuthJwt = jwtDecode(accessToken);

        setAuth({
          name: user.name,
          picture: user.picture,
          token: accessToken,
        });
        navigate("/");
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  /*const redirect = () => {
    window.location.href = "http://localhost:5000/api/auth/loginWithGoogle";
  };*/

  return (
    <Container>
      {auth ? (
        <GroupHorizontal style={{ justifyContent: "center", gap: "8px" }}>
          <Avatar src={auth.picture} />
        </GroupHorizontal>
      ) : (
        <GroupHorizontal onClick={loginWithEmail} style={{ gap: "8px" }}>
          <CiUser color="#161616" size={28} />
          <LoginText>Login</LoginText>
        </GroupHorizontal>
      )}
    </Container>
  );
};

export default Account;
