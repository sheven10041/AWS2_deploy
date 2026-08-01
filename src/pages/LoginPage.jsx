import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isFormValid = username.trim() !== "" && password.trim() !== "";

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!isFormValid || isLoading) return;

    try {
      setIsLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/login/",
        { username, password },
        { withCredentials: true },
      );

      const accessToken = response.data.accessToken ?? response.data.access;

      if (!accessToken) {
        throw new Error("Access Token이 없습니다.");
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem(
        "username",
        response.data.username ?? username.trim(),
      );

      alert("로그인에 성공했어요!");
      navigate("/");
    } catch (error) {
      if (error.response?.status === 401) {
        alert("아이디 또는 비밀번호를 확인해주세요.");
        return;
      }

      alert("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <LoginContainer>
        <LogoWrapper>
          <Logo>
            LIKELION
            <Generation>14TH</Generation>
          </Logo>

          <Title>숙멋 프론트 TMI 게시판</Title>
        </LogoWrapper>

        <LoginForm onSubmit={handleLogin}>
          <InputGroup>
            <Label htmlFor="username">아이디</Label>
            <Input
              id="username"
              type="text"
              placeholder="아이디를 입력해주세요."
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              autoFocus
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
          </InputGroup>

          <LoginButton type="submit" disabled={!isFormValid || isLoading}>
            {isLoading ? "로그인 중..." : "로그인"}
          </LoginButton>
        </LoginForm>

        <BottomText>
          아직 계정이 없으신가요?
          <SignUpButton type="button">회원가입하기</SignUpButton>
        </BottomText>

        <BackButton type="button" onClick={() => navigate("/")}>
          게시판으로 돌아가기
        </BackButton>
      </LoginContainer>
    </PageWrapper>
  );
};

export default LoginPage;

const PageWrapper = styled.main`
  display: flex;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 3rem 1.5rem;
  background-color: var(--bg-brown);
`;

const LoginContainer = styled.section`
  display: flex;
  width: 100%;
  max-width: 40rem;
  flex-direction: column;
  align-items: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3.5rem;
`;

const Logo = styled.div`
  position: relative;
  color: #ff7710;
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.12em;
  transform: rotate(-4deg);
`;

const Generation = styled.span`
  position: absolute;
  right: -1.8rem;
  bottom: -1.5rem;
  color: #ff7710;
  font-size: 1.45rem;
  font-weight: 900;
  letter-spacing: -0.08em;
  transform: rotate(6deg);
`;

const Title = styled.h1`
  margin: 2.5rem 0 0;
  color: var(--text-black);
  font-size: clamp(1.8rem, 5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.04em;
`;

const LoginForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1.8rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Label = styled.label`
  color: var(--text-black);
  font-size: 1.1rem;
  font-weight: 700;
`;

const Input = styled.input`
  width: 100%;
  height: 4.25rem;
  padding: 0 1.4rem;
  border: 1px solid var(--text-brown);
  border-radius: 0.3rem;
  outline: none;
  background-color: var(--bg-white);
  color: var(--text-black);
  font-size: 1rem;

  &::placeholder {
    color: var(--text-grey);
  }

  &:focus {
    border-color: #574736;
    box-shadow: 0 0 0 2px rgba(87, 71, 54, 0.12);
  }
`;

const LoginButton = styled.button`
  width: 100%;
  height: 4.25rem;
  margin-top: 0.5rem;
  border: none;
  border-radius: 0.3rem;
  background-color: #574736;
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    background-color: #46382b;
  }
`;

const BottomText = styled.p`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  margin: 2rem 0 0;
  color: #8d8781;
  font-size: 1rem;
`;

const SignUpButton = styled.button`
  padding: 0;
  border: none;
  border-bottom: 1px solid #8d8781;
  background: none;
  color: #8d8781;
  font-weight: 600;
  cursor: pointer;
`;

const BackButton = styled.button`
  margin-top: 1.25rem;
  padding: 0;
  border: none;
  background: none;
  color: #574736;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
`;
