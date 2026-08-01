import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../apis/api";
import styled from "styled-components";

import Button from "../components/Button";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const accessToken = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!accessToken) {
      alert("게시글을 수정하려면 로그인이 필요해요.");

      navigate("/login", {
        replace: true,
      });

      return;
    }

    const getEntry = async () => {
      try {
        const response = await api.get(`/entries/${id}/`);

        if (response.data.author !== username) {
          alert("본인이 작성한 게시글만 수정할 수 있어요.");
          navigate(`/detail/${id}`, { replace: true });
          return;
        }

        setComment(response.data.comment);
      } catch (error) {
        console.error("게시글 조회 실패:", error);

        alert("게시글을 불러오지 못했어요.");
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    getEntry();
  }, [accessToken, id, navigate, username]);

  const updateEntry = async () => {
    if (!comment.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);

      await api.put(`/entries/${id}/`, {
        comment: comment.trim(),
      });

      alert("게시글이 수정되었어요!");
      navigate(`/detail/${id}`);
    } catch (error) {
      console.error("게시글 수정 실패:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");

        alert("로그인이 만료되었어요. 다시 로그인해주세요.");

        navigate("/login");
        return;
      }

      alert("게시글 수정에 실패했어요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <EditPageWrapper>
      <FormContainer>
        <Title>나의 TMI 수정하기</Title>

        <Label>내용</Label>

        <TextArea
          placeholder="수정할 내용을 입력해주세요."
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          autoFocus
        />
      </FormContainer>

      <ButtonWrapper>
        <Button
          text={isSubmitting ? "수정 중..." : "수정 완료"}
          onBtnClick={updateEntry}
        />

        <Button text="취소" onBtnClick={() => navigate(`/detail/${id}`)} />
      </ButtonWrapper>
    </EditPageWrapper>
  );
};

export default EditPage;

const EditPageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  padding: 2.25rem 4.2rem 3.88rem;
  gap: 2rem;
  background-color: var(--bg-light);
`;

const FormContainer = styled.section`
  display: flex;
  width: 100%;
  padding: 3rem 2.5rem;
  flex-direction: column;
  gap: 1rem;
  border-radius: 0.4375rem;
  background-color: var(--bg-white);
`;

const Title = styled.h2`
  margin: 0 0 1.5rem;
  color: var(--text-black);
  font-size: 1.75rem;
`;

const Label = styled.label`
  color: var(--text-black);
  font-size: 1.25rem;
  font-weight: 600;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 12rem;
  padding: 1.5rem;
  border: none;
  border-radius: 0.4375rem;
  outline: none;
  resize: none;
  background-color: rgba(245, 241, 237, 0.5);
  color: var(--text-black);
  font-size: 1.25rem;

  &:focus {
    box-shadow: 0 0 0 2px rgba(87, 71, 54, 0.2);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Message = styled.div`
  padding: 4rem 2rem;
  text-align: center;
`;
