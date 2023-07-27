import { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Searchbar() {
  let [searchInput, setSearchInput] = useState("");
  let searchBar = useRef(null);
  let navigate = useNavigate();
  const validSearches = ["fish", "sea", "bugs", "fossils", "villagers"];

  function SubmitSearch() {
    setSearchInput(searchInput.toLowerCase().trim());
    if (validSearches.includes(searchInput)) {
      navigate(`/Database/${searchInput}/1`);
    } else {
      searchBar.current.classList.add("animate-wiggle");
      searchBar.current.classList.add("border-red-500");
      setTimeout(() => {
        searchBar.current.classList.remove("animate-wiggle");
        searchBar.current.classList.remove("border-red-500");
      }, 200);
    }
  }

  useEffect(() => {
    searchBar.current = document.querySelector(".search-bar");
  });

  return (
    <div className="flex animate-bounce items-center space-x-2">
      <input
        className="search-bar rounded-md border-2 border-[#76C893] px-1 text-2xl font-medium text-[#1A759F] placeholder-[#1A759F]/50 transition-transform duration-1000 focus:outline-none"
        type="text"
        placeholder="Fish..."
        onChange={(event) => (searchInput = event.target.value)}
        onKeyDown={(event) => {
          if (event.code == "Enter") SubmitSearch();
        }}
      ></input>
      <button onClick={SubmitSearch}>
        <AiOutlineSearch className="rounded-md text-4xl text-[#1A759F] transition-all duration-100 hover:rotate-12 hover:scale-125 hover:bg-[#1A759F]/10" />
      </button>
    </div>
  );
}
export default Searchbar;
