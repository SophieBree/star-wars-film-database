import Head from "next/head";
import React, { useState, useEffect } from "react";
import Search from "./search";
import Image from "next/image";
import update from "immutability-helper";
import Link from "next/link";

const filterPosts = (data, query) => {
  if (!query) {
    return data;
  }

  return data.filter((data) => {
    const filmName = data.title.toLowerCase();
    return filmName.includes(query);
  });
};

export default function Home() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredPosts = filterPosts(data, searchQuery);

  useEffect(() => {
    if ("data" in localStorage) {
      setData(JSON.parse(localStorage.getItem("data")));
    } else {
      fetch("https://swapi.dev/api/films/", { mode: "cors" })
        .then((res) => res.json())
        .then((result) => {
          result.results.map((data) => (data.favourited = false));
          setData(result.results);
          localStorage.setItem("data", JSON.stringify(result.results));
        });
    }
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Star Wars Film Database</h1>

        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="filmContainer">
          <ul className="filmList">
            {filteredPosts.map((el, index) => (
              <li key={el.episode_id}>
                <span
                  className="favourite"
                  onClick={() => {
                    const objectValue = {
                      ...el,
                      favourited: !el.favourited,
                    };

                    const index = data.findIndex(
                      (item) => item.episode_id == el.episode_id
                    );
                    const updatedData = update(data, {
                      $splice: [[index, 1, objectValue]],
                    });
                    updatedData.sort(
                      (a, b) =>
                        new Date(a.release_date) - new Date(b.release_date)
                    );
                    updatedData.sort((a, b) => b.favourited - a.favourited);

                    setData(updatedData);
                    if (typeof window !== "undefined") {
                      localStorage.setItem("data", JSON.stringify(updatedData));
                    }
                  }}
                >
                  {data[index].favourited == true ? "★" : "☆"}
                </span>
                <Link href={`/${el.episode_id}`}>
                  <Image
                    src={require(`../assets/${el.episode_id}.jpg`)}
                    alt={`Poster of episode ${el.episode_id}`}
                    width={252}
                    height={385}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <style jsx>{`
        .filmList {
          list-style-type: none;
          display: flex;
        }

        .filmList li {
          transition: transform 0.2s;
          position: relative;
          text-align: left;
          color: white;
        }

        .filmList li:hover {
          transform: scale(1.2);
        }

        .filmList span {
          position: absolute;
          top: 8px;
          left: 16px;
          z-index: 1;
          font-size: 32px;
        }

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0 10rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          justify-self: start;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
            background-color: #EFEFEF
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
