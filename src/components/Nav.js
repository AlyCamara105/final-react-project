import { Link } from "react-router-dom";
import Menu from "../components/Menu";

function Nav() {
  return (
    <nav className="flex items-center justify-between bg-[#d9ed92] p-5">
      <Link to="/">
        <img
          className="w-16 transition-all duration-100 hover:rotate-12 hover:scale-125"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Animal_Crossing_Leaf.svg/1024px-Animal_Crossing_Leaf.svg.png?20220815231826"
          alt=""
        />
      </Link>
      <Link to="/Database/no_filter/1">
        <button className="mr-2 hidden rounded-md p-1 text-4xl font-bold text-[#1E6091] transition-all duration-150 hover:scale-125 hover:bg-[#99D98C]/30 sm:block">
          Database
        </button>
      </Link>
      <Menu />
    </nav>
  );
}
export default Nav;
