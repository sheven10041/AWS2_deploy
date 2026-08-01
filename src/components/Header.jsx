import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import api, { clearAuthStorage } from "../apis/api";

const Header = ({ title, description, button }) => {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");

  const isLoggedIn = Boolean(accessToken);

  const handleWriteClick = () => {
    if (!isLoggedIn) {
      const shouldLogin = window.confirm(
        "게시글을 작성하려면 로그인이 필요해요. 로그인 페이지로 이동할까요?",
      );

      if (shouldLogin) {
        navigate("/login");
      }

      return;
    }

    navigate("/write");
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout/");
    } catch (error) {
      console.error("로그아웃 요청 실패:", error);
    } finally {
      clearAuthStorage();

      alert("로그아웃되었습니다.");
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <HeaderContainer>
      <HeaderInfo>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </HeaderInfo>

      <ButtonGroup>
        {isLoggedIn ? (
          <Button text="로그아웃" onBtnClick={handleLogout} />
        ) : (
          <Button text="로그인" onBtnClick={() => navigate("/login")} />
        )}

        {button && <Button text="TMI 작성하기" onBtnClick={handleWriteClick} />}
      </ButtonGroup>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 11.75rem;
  padding: 3.75rem 3.5rem 0 3.5rem;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.875rem;
  border-bottom: 1px solid var(--text-brown);
  background: rgba(255, 255, 255, 0.9);
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.88rem;
`;

const Title = styled.h1`
  margin: 0;
  color: #000;
  font-size: 2.25rem;
  font-weight: 600;
`;

const Description = styled.p`
  margin: 0;
  color: var(--text-brown);
  font-size: 1.25rem;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
