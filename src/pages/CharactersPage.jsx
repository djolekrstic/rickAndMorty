import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Characters from "../components/Characters";
import { CiSearch } from "react-icons/ci";

const CharactersPage = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const observer = useRef();
  const lastCharacter = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const getData = () => {
    setLoading(true);
    setError(false);
    axios(
      `https://rickandmortyapi.com/api/character/?name=${query}&page=${page}`
    )
      .then((res) => {
        let newData = res.data.results;
        setData((prevData) => {
          return [...prevData, ...newData];
        });
        setHasMore(res.data.info.count > 0);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };

  useEffect(() => {
    setData([]);
  }, [query]);

  useEffect(() => {
    getData();
  }, [query, page]);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setPage(1);
  };

  return (
    <div className="app-container">
      <div className="input-container">
        <CiSearch className="input-icon" size="1.3em" />
        <input
          className="input"
          placeholder="Search character..."
          value={query}
          onChange={handleChange}
        />
      </div>
      <h1 className="heading heading-margin">Characters</h1>
      <Characters data={data} lastCharacter={lastCharacter} />
      <div>{loading && !error ? "Loading..." : ""}</div>
    </div>
  );
};

export default CharactersPage;
