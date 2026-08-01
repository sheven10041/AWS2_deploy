import React from "react";
import styled from "styled-components";
import LionIcon from "../components/LionIcon";
import Out from "../assets/Out.svg";
import { useNavigate } from "react-router-dom";

const DetailComment = ({ detail }) => {
  const navigate = useNavigate();
  return (
    <DetailCommentWrapper>
      <BackButton type="button" onClick={() => navigate(-1)}>
        <img src={Out} alt="뒤로가기" />
      </BackButton>
      <ProfileWrapper>
        <LionIcon />
        <InfoWrapper>
          <Author>{detail.author}</Author>
          <DateTime>{detail.timestamp}</DateTime>
        </InfoWrapper>
      </ProfileWrapper>
      <CommentText>{detail.comment}</CommentText>
    </DetailCommentWrapper>
  );
};

export default DetailComment;

const DetailCommentWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 71.5625rem;
  background-color: var(--bg-white);
  border-radius: 0.4375rem;
  padding: 5rem 2.25rem 6.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  box-sizing: border-box;
`;

const BackButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 2.25rem;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  img {
    width: 2rem;
    height: 2rem;
    display: block;
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Author = styled.p`
  margin: 0;
  color: var(--text-black);
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
`;

const DateTime = styled.p`
  margin: 0;
  color: var(--text-grey);
  text-align: center;
  font-size: 1.25rem;
  font-weight: 400;
`;

const CommentText = styled.p`
  margin: 0;
  color: var(--text-black);
  text-align: center;
  font-size: 1.75rem;
  font-weight: 400;
  opacity: 0.8;
`;
