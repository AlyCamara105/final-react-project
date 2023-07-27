import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";

function GameObject() {
  const { filter, id } = useParams();
  const [gameObjectData, setGameObjectData] = useState(null);

  useEffect(() => {
    async function loadData() {
      const response = await axios.get(
        `https://acnhapi.com/v1a/${filter}/${id}`,
      );

      setTimeout(() => {
        setGameObjectData(response.data);
      }, Math.random() * 3000);
    }

    loadData();
  }, []);

  return (
    <>
      <Nav />
      <div className="flex w-full justify-center p-5">
        <div className="flex w-full flex-col items-center justify-around lg:flex-row">
          <div className="flex items-center justify-center">
            {gameObjectData ? (
              <img
                className="mt-5 rounded-md md:max-w-2xl"
                src={gameObjectData.image_uri}
                alt=""
              />
            ) : (
              <div className="h-[128px] w-[128px] rounded-md bg-gradient-to-r from-[#76C893] to-[#B5E48C]"></div>
            )}
          </div>
          <div className="mt-10 flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold text-[#1A759F] md:text-6xl">
              {gameObjectData ? (
                gameObjectData.name["name-EUen"]
              ) : (
                <div className="h-5 w-64 rounded-md bg-gradient-to-r from-[#76C893] to-[#B5E48C]"></div>
              )}
            </h1>
            {gameObjectData ? (
              <p className="my-10 rounded-md bg-[#34A0A4]/30 p-2 text-lg font-semibold leading-loose text-[#168AAD] md:max-w-2xl">
                {gameObjectData["museum-phrase"] || gameObjectData.saying}
              </p>
            ) : (
              <div className="mt-10 h-52 w-80 rounded-md bg-gradient-to-r from-[#76C893] to-[#B5E48C]"></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default GameObject;
