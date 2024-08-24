import React from "react";
import api from "../api";
import { useState, useEffect } from "react";

const Blog = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function getArticles() {
    api.get("/api/recent-news/")
      .then((res) => res.data)
      .then((data) => {
        setNews(data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    getArticles();
  }, []);

  if(loading){
    return <p className="bg-[#008000] text-white p-4 text-center py-4">Loading...</p>
  }
  if(error){
    return <p className="bg-[#008000] text-white p-4 text-center">Error Loading Recent News: {error.message}</p>
  }

  return (
    <>
      <section className="bg-[#008000] pb-10 pt-20 lg:pb-20 lg:pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                <h2 className="mb-4 text-3xl font-bold text-[#ffff00] sm:text-4xl md:text-[40px]">
                  Recent News
                </h2>
                <p className="text-base text-white">
                  Keep up with the latest on education, science, technology, engineering,
                  and math. Don't miss out on the exciting changes.
                </p>
              </div>
            </div>
          </div>

          <div className="-mx-4 flex flex-wrap">
            {news.length > 0 ? (
              news.map((article) => (
                <BlogCard
                  date={article.formatted_date}
                  CardTitle={article.title}
                  CardDescription={article.excerpt}
                  image={article.img_link}
                  articleLink={article.article_link}
                />
              ))
            ) : (
              <p className="text-white">No news available.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;

const BlogCard = ({ image, date, CardTitle, CardDescription, articleLink }) => {
  return (
    <>
      <div className="w-full px-4 md:w-1/2 lg:w-1/3">
        <div className="mb-10 w-full">
          <div className="mb-8 overflow-hidden rounded">
            <img src={image} alt="" className="w-full" />
          </div>
          <div>
            {date && (
              <span className="mb-5 inline-block rounded bg-yellow-500 px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
                {date}
              </span>
            )}
            <h3>
              <a
                href={articleLink}
                className="mb-4 inline-block text-xl font-semibold text-white hover:text-yellow-dark sm:text-2xl lg:text-xl xl:text-2xl"
                target="_blank" 
                rel="noopener noreferrer"
              >
                {CardTitle}
              </a>
            </h3>
            <p className="text-base text-[#efece2]">
              {CardDescription}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};