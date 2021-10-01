import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

        <Link href="/">Back to Home</Link>{" "}

      <main>
        <h1 className="title">{objectData.title}</h1>
        <p>Description: {objectData.opening_crawl}</p>
        <p>Director: {objectData.director}</p>
        <p>Producer: {objectData.producer}</p>
        <p>Release Date: {objectData.release_date}</p>
        <span>Characters:</span>
        <div className="characters-container">
          {charData.isLoaded
            ? charData.data.map((el) => (
                <div className="character">
                  <Image
                    src={require(`../assets/characters/${el.name}.png`)}
                    alt={`Picture of ${el.name}`}
                    width={125}
                    height={150}
                  />
                  <div className="tooltiptext">
                    <span>Name: {el.name}</span>
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
      <style jsx>{`

        .characters-container {
          display: flex;
          flex-direction: row;
          height: 600px;
          flex-wrap: wrap;
        }

        .character {
          position: relative;
          padding: 20px;
          padding-bottom: 70px;
        }

        .character .tooltiptext {
          visibility: hidden;
          width: 200px;
          background-color: black;
          color: #fff;
          text-align: center;
          border-radius: 6px;
          padding: 5px 0;
          
          position: absolute;
          z-index: 1;
          top: 100%
          left: 50%;
          margin-left: -40px;
        }

        .character:hover .tooltiptext {
          visibility: visible;
        }

        .tooltiptext span {
          display: block;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          width: 80%;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}
