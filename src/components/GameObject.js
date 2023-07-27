import { useState } from "react";
import { useNavigate } from "react-router-dom";

function GameObject({ datum, filter }) {
  const [loaded, setLoaded] = useState(false);
  let img = new Image();
  const navigate = useNavigate();

  img.src = datum.icon_uri || datum.image_uri;

  img.onload = () => {
    setTimeout(() => {
      setLoaded(true);
    }, Math.random() * 3000);
  };

  function GameObjectClicked() {
    navigate(`/${filter}/${datum.id || datum["file-name"]}`);
  }

  return (
    <button onClick={GameObjectClicked}>
      {loaded ? (
        <div className="group relative">
          <div className="m-1 mx-10 rounded-md bg-[#52B69A] p-2 group-hover:animate-pulse">
            <img className="group-hover:animate-wiggle" src={img.src} alt="" />
          </div>
          <h1 className="absolute left-1/2 top-1/2 z-10 hidden translate-x-[-50%] translate-y-[-50%] text-center text-5xl font-bold text-[#1A759F] group-hover:block">
            {datum.name["name-EUen"]}
          </h1>
        </div>
      ) : (
        <div className="m-1 mx-10 h-[136px] w-[136px] rounded-md bg-gradient-to-r from-[#76C893] to-[#B5E48C]"></div>
      )}
    </button>
  );
}
export default GameObject;
