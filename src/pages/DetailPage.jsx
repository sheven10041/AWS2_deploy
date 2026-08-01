import Button from "../components/Button";
import styled from "styled-components";
import DetailComment from "../components/DetailComment";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../apis/api";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [detail, setDetail] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const accessToken = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");
  const isAuthor = Boolean(username && username === detail?.author);

  const getDetail = (id) => {
    api
      .get(`/entries/${id}/`)
      .then((res) => {
        console.log("상세 게시글:", res.data);
        setDetail(res.data);
      })
      .catch((err) => {
        console.log("상세 게시글 조회 실패:", err);

        alert("게시글을 불러오지 못했어요.");
        navigate("/");
      });
  };

  useEffect(() => {
    getDetail(id);
  }, [id]);

  const deleteComment = async () => {
    if (!accessToken) {
      alert("로그인이 필요해요.");
      navigate("/login");
      return;
    }

    if (!isAuthor) {
      alert("본인이 작성한 게시글만 삭제할 수 있어요.");
      return;
    }

    const shouldDelete = window.confirm("이 게시글을 정말 삭제할까요?");

    if (!shouldDelete) {
      return;
    }

    try {
      setIsDeleting(true);

      await api.delete(`/entries/${id}/`);

      alert("게시글이 삭제되었어요.");
      navigate("/");
    } catch (error) {
      console.error("게시글 삭제 실패:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");

        alert("로그인이 만료되었어요. 다시 로그인해주세요.");

        navigate("/login");
        return;
      }

      alert("게시글 삭제에 실패했어요.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!detail) {
    return null;
  }

  return (
    <DetailPageWrapper>
      <DetailComment detail={detail} />

      {isAuthor && (
        <ButtonWrapper>
          <Button text="수정하기" onBtnClick={() => navigate(`/edit/${id}`)} />

          <Button
            text={isDeleting ? "삭제 중..." : "삭제하기"}
            onBtnClick={deleteComment}
          />
        </ButtonWrapper>
      )}
    </DetailPageWrapper>
  );
};

export default DetailPage;

const DetailPageWrapper = styled.div`
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
