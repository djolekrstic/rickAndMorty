import { Link, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { FaAngleLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";

const CharacterPage = () => {
  const { id } = useParams();
  let [data, setData] = useState([]);
  const { name, image, species, origin, location, status, gender, episode } =
    data;

  let infoSections = ["Species", "Origin", "Location", "Status", "Gender"];
  let infoParagraphs = [species, origin?.name, location?.name, status, gender];

  const getData = () => {
    axios(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="character-page">
      <div className="character-page-header">
        <div>
          <Link to="/" className="back-link">
            <FaAngleLeft /> BACK
          </Link>
        </div>
        <div className="character-page-header-info">
          <div className="avatar-div">
            <img
              className="avatar-character-page avatar-position"
              src={image}
              alt={name}
            />
            <div className="avatar-container"></div>
          </div>
          <h1 className="character-name-white">{name}</h1>
        </div>
      </div>
      <div className="character-page-details">
        <h2 className="heading">Character info</h2>
        <div className="character-info-grid">
          {infoSections.map((item, index) => (
            <div key={nanoid()}>
              <h2 className="character-info-sections">{item}</h2>
              <p className="character-info-paragraph">
                {infoParagraphs[index]}
              </p>
            </div>
          ))}
        </div>
      </div>
      <h2 className="heading heading-margin">Episodes</h2>
      <div className="character-episodes">
        <div className="episodes">
          {episode?.map((episodeItem) => (
            <p key={nanoid()} className="character-info-sections">
              {episodeItem}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CharacterPage;
