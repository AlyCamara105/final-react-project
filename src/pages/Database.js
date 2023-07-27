import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GameObject from "../components/GameObject";
import Nav from "../components/Nav";
import Searchbar from "../components/Searchbar";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

function Database() {
  const { filter, page } = useParams();
  const [data, setData] = useState(null);
  const pageLength = 15;
  let endSlice = pageLength * Number(page);
  const startSlice = page == "1" ? 0 : endSlice - pageLength;
  let [lastPage, setLastPage] = useState(false);
  let [totalPages, setTotalPages] = useState(null);
  const navigate = useNavigate();
  let pageNumberInput = null;
  let pageInput = useRef(null);

  function PreviousPage() {
    navigate(`/Database/${filter}/${Number(page) - 1}`);
  }

  function NextPage() {
    navigate(`/Database/${filter}/${Number(page) + 1}`);
  }

  function PageInputChanged(event) {
    pageNumberInput = event.target.value;
  }

  function PageInputSubmitted(event) {
    function submit() {
      if (pageNumberInput) {
        if (pageInput.current) {
          pageInput.current.value = "";

          if (
            Number(pageNumberInput) >= 1 &&
            Number(pageNumberInput) <= totalPages
          ) {
            navigate(`/Database/${filter}/${Number(pageNumberInput)}`);
          }
        }
      }
    }

    if (event.code) {
      if (event.code == "Enter") submit();
    } else {
      submit();
    }
  }

  useEffect(() => {
    if (filter == "no_filter") {
      setData(null);
      return;
    }

    async function loadData() {
      let responseData = null;
      let slicedData = null;

      const response = await axios.get(`https://acnhapi.com/v1a/${filter}`);
      responseData = response.data;

      setTotalPages(Math.ceil(responseData.length / 15));

      if (endSlice > responseData.length) {
        endSlice = responseData.length;
        setLastPage(true);
      } else {
        setLastPage(false);
      }

      slicedData = responseData.slice(startSlice, endSlice);

      setData(slicedData);
    }

    loadData();
  }, [filter, page]);

  useEffect(() => {
    pageInput.current = document.querySelector(".page__input");
  });

  return (
    <>
      <Nav />
      <div className="relative p-5">
        <div className="mt-2 flex items-center justify-center md:justify-end">
          <Searchbar />
        </div>
        <div className="mt-1 text-center text-xl font-semibold text-[#1E6091]/80 lg:text-2xl">
          {!data &&
            (filter == "no_filter" ? (
              <p className="">
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
            ) : (
              <h1 className="sm:text-start">
                Search results for: <span className="font-bold">{filter}</span>
              </h1>
            ))}
        </div>
        <div className="mb-10 mt-5 flex flex-wrap justify-center">
          {data != null &&
            data.map((datum) => (
              <GameObject datum={datum} key={datum.id} filter={filter} />
            ))}
        </div>
        {data && (
          <div className="sticky bottom-[-1px] z-20 flex h-24 justify-center text-2xl text-[#184E77] drop-shadow-lg">
            <div className="flex items-center space-x-5">
              {page != "1" && (
                <button onClick={PreviousPage}>
                  <BsFillArrowLeftCircleFill className="rounded-full text-4xl transition duration-100 hover:scale-125" />
                </button>
              )}
              <div className="flex items-center space-x-1">
                <p className="font-bold">Page </p>
                <input
                  className="page__input w-12 rounded-md pl-1 text-2xl font-medium placeholder-[#184E77]/60 outline-none transition duration-100"
                  type="number"
                  placeholder={page}
                  min="1"
                  max={totalPages}
                  onKeyDown={PageInputSubmitted}
                  onBlur={PageInputSubmitted}
                  onChange={PageInputChanged}
                />
                <p className="w-18 font-bold"> of {totalPages}</p>
              </div>
              {!lastPage && (
                <button onClick={NextPage}>
                  <BsFillArrowRightCircleFill className="rounded-full text-4xl transition duration-100 hover:scale-125" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Database;
