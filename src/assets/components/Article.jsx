import React from "react";
import { Link, useLocation } from "react-router-dom";

const Article = () => {
  const article = useLocation().state.article;
  console.log(useLocation());
  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default Article;
