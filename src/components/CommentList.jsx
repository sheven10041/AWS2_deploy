import Comment from "./Comment";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getComment = () => {
    setLoading(true);
    setError(false);

    axios
      .get("http://127.0.0.1:8000/entries/")
      .then((res) => {
        console.log(res);
        setComments(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getComment();
  }, []);

  if (loading) {
    return <Message>게시글을 불러오는 중입니다.</Message>;
  }

  if (error) {
    return <Message>게시글을 불러오지 못했습니다. 잠시 후 다시 시도.</Message>;
  }

  if (comments.length == 0) {
    return <Message>아직 등록된 게시글이 없습니다</Message>;
  }

  return (
    <CommentWrapper>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </CommentWrapper>
  );
};

export default CommentList;

const CommentWrapper = styled.div`
  display: grid;
  width: 100%;
  padding: 2rem 3.5rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem 1.75rem;
`;

const Message = styled.div`
  width: 100%;
  padding: 2rem;
  text-align: center;
  color: #666;
`;
