import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../apis/api";
import styled from "styled-components";

import Button from "../components/Button";
import CommentForm from "../components/CommentForm";

const WritePage = () => {
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const accessToken = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!accessToken) {
      alert("게시글을 작성하려면 로그인이 필요해요.");

      navigate("/login", {
        replace: true,
      });
    }
  }, [accessToken, navigate]);

  const postComment = async () => {
    if (!comment.trim()) {
      alert("내용을 입력해 주세요.");
      return;
    }

    if (!accessToken || !username) {
      alert("로그인 정보가 없습니다. 다시 로그인해 주세요.");
      navigate("/login");
      return;
    }

    try {
      setIsSubmitting(true);

      await api.post("/entries/", {
        comment: comment.trim(),
      });

      alert("게시글 작성이 완료되었어요!");
      navigate("/");
    } catch (error) {
      console.error("게시글 작성 실패:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");

        alert("로그인 정보가 만료되었어요. 다시 로그인해주세요.");

        navigate("/login");
        return;
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!accessToken) {
    return null;
  }

  return (
    <WritePageWrapper>
      <CommentForm comment={comment} setComment={setComment} />

      <ButtonWrapper>
        <Button
          text={isSubmitting ? "작성 중..." : "작성하기"}
          onBtnClick={postComment}
        />
        <Button text="취소" onBtnClick={() => navigate(-1)} />
      </ButtonWrapper>
    </WritePageWrapper>
  );
};

export default WritePage;

const WritePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2.25rem 4.2rem 3.88rem;
  background-color: var(--bg-light);
  gap: 2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.75rem;
`;
