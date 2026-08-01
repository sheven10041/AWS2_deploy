import styled from "styled-components";
import LionIcon from "./LionIcon";
import { useNavigate } from "react-router-dom";

const Comment = ({ comment }) => {
  const navigate = useNavigate();

  const goToDetailPage = () => {
    navigate(`/detail/${comment.id}`);
  };
  return (
    <CommentContainer onClick={goToDetailPage}>
      <HeaderContainer>
        <LionIcon />
        <HeaderInfo>
          <Author>{comment.author}</Author>
          <DateTime>{comment.timestamp}</DateTime>
        </HeaderInfo>
      </HeaderContainer>
      <CommentText>{comment.comment}</CommentText>
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.div`
  display: flex;
  padding: 2.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  border-radius: 0.4375rem;
  background-color: var(--bg-white);
  cursor: pointer;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
`;

const Author = styled.p`
  margin: 0;
  color: var(--text-black);
  font-size: 1.25rem;
  font-weight: 500;
`;

const DateTime = styled.p`
  margin: 0;
  color: var(--text-grey);
  font-size: 0.9375rem;
  font-weight: 400;
`;

const CommentText = styled.p`
  margin: 0;
  width: 100%;
  color: var(--text-black);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  font-size: 1.25rem;
  font-weight: 400;
`;
