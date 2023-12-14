import { useParams } from "react-router-dom";
import { ALL_CHAMPION_DATA } from "../constants";
import { useEffect, useState } from "react";

function ChampionInfo() {
  const { championKey } = useParams();
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState({});

  useEffect(() => {
    const championData = ALL_CHAMPION_DATA.filter(
      (champion) => champion.key === championKey
    );
    setData(championData[0]);

    const { position, rangetype, region, resource } = championData[0];
    setSelectedData({ position, rangetype, region, resource });
  }, [championKey]);

  return (
    <div className="animate-fadein flex flex-col items-center justify-center h-full px-2 m-auto space-y-4 my-4 w-full text-white">
      <img
        alt={data.key}
        src={`${process.env.PUBLIC_URL}/champion/${data.key}.JPG`}
        className="w-full h-48 object-cover object-center "
      />
      <div className="flex flex-col items-center justify-center">
        <span className="text-3xl font-bold italic uppercase">
          {data.title}
        </span>
        <span className="text-6xl font-bold italic uppercase">{data.name}</span>
      </div>

      <div className="grid grid-cols-2 gap-x-14 gap-y-5 mt-5">
        {selectedData &&
          Object.keys(selectedData).map((category) => (
            <div key={category}>
              <h1 className="font-bold text-2xl uppercase">{category}</h1>
              {selectedData[category].map((item, index) => (
                <div className="flex justify-start  items-center" key={item}>
                  <img
                    src={`${process.env.PUBLIC_URL}/${category}/${item}.JPG`}
                    className="h-10"
                  />
                  <span className="ml-3 uppercase">{item}</span>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default ChampionInfo;
