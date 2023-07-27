import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Searchbar from "../components/Searchbar";

function Home() {
  const [BitterlingData, setBitterlingData] = useState({});

  useEffect(() => {
    async function loadData() {
      const data = await axios.get("https://acnhapi.com/v1a/fish/1");

      setBitterlingData(data.data);
    }

    setTimeout(() => {
      loadData();
    }, Math.random() * 3000);
  }, []);
  return (
    <>
      <Nav />
      <div className="App flex flex-col p-5">
        <div className="mt-2 flex flex-col items-center justify-center space-y-5">
          <h1 className="text-3xl font-bold text-[#184E77] lg:text-5xl">
            Crossing Critters
          </h1>
          <p className="text-center text-xl font-semibold text-[#1E6091] lg:text-2xl">
            Search up critters, fossils, fish, villagers and{" "}
            <span className="font-bold">more!</span>
          </p>
          <p className="text-center text-xl font-semibold text-[#1E6091]/80 lg:text-2xl">
            Valid search inputs: <span className="font-bold">Fish</span>
            {", "}
            <span className="font-bold">Sea</span>
            {", "}
            <span className="font-bold">Bugs</span>
            {", "}
            <span className="font-bold">Fossils</span>
            {", and "}
            <span className="font-bold">Villagers</span>
          </p>
        </div>
        <div className="mt-10 flex h-10 items-center justify-center">
          <Searchbar />
        </div>
        <div className="mt-10 flex animate-bounce items-center justify-center">
          {BitterlingData.icon_uri ? (
            <img src={BitterlingData.icon_uri} className="w-48" alt="" />
          ) : (
            <div className="h-48 w-48 rounded-md bg-gradient-to-r from-[#76C893] to-[#B5E48C]"></div>
          )}
        </div>
      </div>
    </>
  );
}
export default Home;
