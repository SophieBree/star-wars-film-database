import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/film.module.scss"

export default function four() {
  const [charData, setCharData] = useState({ isLoaded: false, data: [null] });
  const data =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("data")).filter(
          (el) => el.episode_id == "4"
        )
      : "data";

  const objectData = data[0];
  const characterData = [];
  const myAsyncLoopFunction = async (array) => {
    for await (const el of array) {
      await fetch(`${el}`, { mode: "cors" })
        .then((res) => res.json())
        .then((result) => characterData.push(result));
    }
    await setCharData({ ...charData, isLoaded: true, data: characterData });
  };

  useEffect(() => {
    myAsyncLoopFunction(objectData.characters);
  }, []);

  return (
    <div>
      <Link href="/">
        <a className={styles.navLink}>Home</a>
      </Link>
      <main>
        <div className={styles.titleNavigation}>
          <h1 className={styles.title}>{objectData.title}</h1>
          <Link href="/5">
            <a className={styles.navLink}>The Empire Strikes Back →</a>
          </Link>
        </div>
        <div className={styles.filmInfo}>
          <div>
            {" "}
            <Image
              className={styles.filmPoster}
              src={require("../assets/4.jpg")}
              alt={"Poster of episode 4"}
              width={252}
              height={385}
            />
          </div>
          <div className={styles.descriptionText}>
            <p className={styles.description}>{objectData.opening_crawl}
            </p>
            <p>Director: {objectData.director}</p>
            <p>Producer: {objectData.producer}</p>
            <p>Release Date: {objectData.release_date}</p>
          </div>
        </div>
        <h1 className={styles.characterHeading}>Characters</h1>
        <div className={styles.charactersContainer}>
          {charData.isLoaded
            ? charData.data.map((el) => (
                <div className={styles.character}>
                  <Image
                    className={styles.characterImage}
                    src={require(`../assets/characters/${el.name}.png`)}
                    alt={`Picture of ${el.name}`}
                    width={112}
                    height={150}
                    layout={"fill"}
                    objectFit={"cover"}
                  />
                  <div className={styles.tooltiptext}>
                    <span>{el.name}</span>
                    <span>Birth Year: {el.birth_year}</span>
                    <span>Eye Colour: {el.eye_color}</span>
                    <span>Gender: {el.gender}</span>
                    <span>Hair Colour: {el.hair_color}</span>
                  </div>
                </div>
              ))
            : "Loading"}
        </div>
      </main>

      <style jsx global>{`
        html,
        body {
          font-family: Fira Sans Extra Condensed, -apple-system,
            BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
            Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          width: 80%;
          margin: 10px auto;
          background-color:black;
            background-image:
            radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 10px),
            radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 10px),
            radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 10px),
            radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,.1) 2px, transparent 10px);
            background-size: 550px 550px, 350px 350px, 250px 250px, 150px 150px;
            background-position: 0 0, 1rem 2rem, 4rem 8rem, 2rem 3rem;
          color: #fff;
        }
      `}</style>
    </div>
  );
}
