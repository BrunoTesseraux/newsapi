import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;

  const [keyword, setKeyword] = useState("");
  const [country, setCountry] = useState("us");
  const [newsData, setNewsData] = useState([]);

  const apiKey = "7876cd5bdf3641d3a40b133e7d938165";
  const apiUrl = `http://newsapi.org/v2/top-headlines?country=${country}&q=${keyword}&apiKey=${apiKey}`;

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setNewsData(data.articles);

      // Update the URL to pass newsData to the Article component
      navigate(`/?keyword=${keyword}&country=${country}`, {
        state: { newsData: data.articles },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Check if there is a search in the URL and use it to update the newsData
    const params = new URLSearchParams(search);
    const urlKeyword = params.get("keyword");
    const urlCountry = params.get("country");

    if (urlKeyword && urlCountry) {
      setKeyword(urlKeyword);
      setCountry(urlCountry);
      fetchData();
    }
  }, [search]);

  return (
    <div>
      <h1>Breaking News</h1>
      <div>
        <input
          type="text"
          placeholder="Enter keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="us">United States</option>
          <option value="de">Deutschland</option>
          {/* Add more country options as needed */}
        </select>
        <button onClick={fetchData}>Search</button>
      </div>

      <ul>
        {newsData.map((article, index) => (
          <li key={index}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <img src={article.urlToImage} alt={article.title} />
            <p>{article.content}</p>
            <NavLink to={`/article/${article.publishedAt}`} state={{ article }}>
              Read more
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
