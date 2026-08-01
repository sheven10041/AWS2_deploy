import React from "react";
import styled from "styled-components";

const Button = ({ text, onBtnClick = () => {} }) => {
  return (
    <ButtonContainer onClick={onBtnClick}>{text || "버튼"}</ButtonContainer>
  );
};

export default Button;

const ButtonContainer = styled.button`
  display: inline-flex;
  padding: 0.875rem 1.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 0.3125rem;
  background-color: #574736;
  color: #fff;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border: none;
  cursor: pointer;
`;
