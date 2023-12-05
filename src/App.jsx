import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./assets/components/Main.jsx";
import Article from "./assets/components/Article.jsx";

function App() {
  return (
    <Router>
      <>
        <h1>Breaking News</h1>

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/article/:id" element={<Article />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
