import { nanoid } from "nanoid";
import { Link } from "react-router-dom";

const Character = ({
  id,
  name,
  image,
  species,
  origin,
  location,
  dataLength,
  lastCharacter,
  index,
}) => {
  let infoSections = ["Species", "Origin", "Location"];
  let originName =
    origin?.name.length > 13 ? origin?.name.split(" ")[0] : origin?.name;
  let locationName =
    location?.name.length > 16 ? location?.name.split(" ")[0] : location?.name;
  let infoParagraphs = [species, originName, locationName];

  return (
    <div
      className="character"
      ref={dataLength === index + 1 ? lastCharacter : null}
    >
      <div>
        <img className="avatar" src={image} alt={name} />
      </div>
      <div className="character-details">
        <div>
          <Link to={`/${id}`} className="character-link">
            <h1 className="character-name">{name}</h1>
          </Link>
        </div>
        <div className="character-info">
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
    </div>
  );
};

export default Character;
