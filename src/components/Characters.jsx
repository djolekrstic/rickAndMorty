import { nanoid } from "nanoid";
import Character from "./Character";

const Characters = ({ data, lastCharacter }) => {
  return (
    <div className="characters">
      {data.map((item, index) => {
        return (
          <Character
            key={nanoid()}
            dataLength={data.length}
            {...item}
            lastCharacter={lastCharacter}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default Characters;
