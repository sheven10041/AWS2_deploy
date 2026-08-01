import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import styled from "styled-components";

const getHeaderConfig = (pathname) => {
  if (pathname === "/write") {
    return {
      title: "TMI 작성하기",
      description: "작성한 내용은 TMI 게시판에 업로드돼요",
      button: false,
    };
  }
  return {
    title: "숙멋 프론트의 TMI 게시판 🦁",
    description: "사자들의 코멘트를 자유롭게 남겨주세요",
    button: true,
  };
};

function App() {
  const { pathname } = useLocation();
  const headerConfig = getHeaderConfig(pathname);

  return (
    <Wrapper>
      <Header {...headerConfig} />
      <Outlet />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg-brown);
`;
