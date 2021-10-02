import Head from "next/head";
import React, { useState, useEffect } from "react";
import Search from "./search";
import Image from "next/image";
import update from "immutability-helper";
import Link from "next/link";
import styles from "../styles/index.module.scss";

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
    <div className={styles.container}>
      <Head>
        <title>Star Wars Film Database</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image
          src={require("../assets/logo.png")}
          alt={"Star Wars Logo"}
          width={450}
          height={200}
        />
        <h1 className={styles.title}>Film Database</h1>

        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className={styles.filmContainer}>
          <ul className={styles.filmList}>
            {filteredPosts.map((el, index) => (
              <li key={el.episode_id}>
                <span className={styles.tooltiptext}>{el.title}</span>
                <span
                  className={`${styles.favourite} ${data[index].favourited == true ? styles.favourited : styles.favourite}`}
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

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: Fira Sans Extra Condensed, -apple-system,
            BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
            Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          background-color: black;
          background-image: radial-gradient(
              white,
              rgba(255, 255, 255, 0.2) 2px,
              transparent 10px
            ),
            radial-gradient(
              white,
              rgba(255, 255, 255, 0.15) 1px,
              transparent 10px
            ),
            radial-gradient(
              white,
              rgba(255, 255, 255, 0.1) 2px,
              transparent 10px
            ),
            radial-gradient(
              rgba(255, 255, 255, 0.4),
              rgba(255, 255, 255, 0.1) 2px,
              transparent 10px
            );
          background-size: 550px 550px, 350px 350px, 250px 250px, 150px 150px;
          background-position: 0 0, 40px 60px, 130px 270px, 70px 100px;
          color: #fff;
        }

        * {
          box-sizing: border-box;
        }
        a {
          color: #6a98af;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
