import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/film.module.scss"

export default function four() {
  const [charData, setCharData] = useState({ isLoaded: false, data: [null] });
  const data =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("data")).filter(
          (el) => el.episode_id == "2"
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
          <Link href="/1">
            <a className={styles.navLink}>← The Phantom Menace</a>
          </Link>
          <h1 className={styles.title}>{objectData.title}</h1>
          <Link href="/3">
            <a className={styles.navLink}>Revenge of the Sith →</a>
          </Link>
        </div>
        <div className={styles.filmInfo}>
          <div>
            {" "}
            <Image
              className={styles.filmPoster}
              src={require("../assets/2.jpg")}
              alt={"Poster of episode 2"}
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
          background-color: #262626;
          color: #fff;
        }
      `}</style>
    </div>
  );
}
