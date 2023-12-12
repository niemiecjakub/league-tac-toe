import { useParams } from "react-router-dom";
import { ALL_CHAMPION_DATA } from "../constants";
import { useEffect, useState } from "react";

function ChampionInfo() {
  const { championKey } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const championData = ALL_CHAMPION_DATA.filter(
      (champion) => champion.key === championKey
    );
    setData(championData[0]);
  }, [championKey]);

  const { position, rangetype, region, resource } = data;

  return (
    <div className="flex flex-col items-center justify-center h-full px-2 m-auto space-y-4 my-4 w-full">
      <div className=" w-full text-white text-xl">
        <img
          alt={data.key}
          src={`${window.location.origin}/champion/${data.key}.JPG`}
          className="w-full h-48 object-cover object-center "
        />
        <h1 className="font-leagueheavy text-3xl">
          {data.name}, {data.title}
        </h1>
        <h1 className="bg-red-200">position</h1>
        {position &&
          position.map((e, i) => (
            <div className="flex justify-start  items-center">
              <img
                src={`${window.location.origin}/position/${e}.PNG`}
                className="h-10"
              />
              <h1 key={e}>{e}</h1>
            </div>
          ))}
        <h1 className="bg-red-200">rangetype</h1>
        {rangetype &&
          rangetype.map((e, i) => (
            <div className="flex justify-start  items-center">
              <img
                src={`${window.location.origin}/rangetype/${e}.PNG`}
                className="h-10"
              />
              <h1 key={e}>{e}</h1>
            </div>
          ))}
        <h1 className="bg-red-200">region</h1>
        {region &&
          region.map((e, i) => (
            <div className="flex justify-start  items-center">
              <img
                src={`${window.location.origin}/region/${e}.PNG`}
                className="h-10"
              />
              <h1 key={e}>{e}</h1>
            </div>
          ))}
        <h1 className="bg-red-200">resource</h1>
        {resource &&
          resource.map((e, i) => (
            <div className="flex justify-start  items-center">
              <img
                src={`${window.location.origin}/resource/${e}.PNG`}
                className="h-10"
              />
              <h1 key={e}>{e}</h1>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ChampionInfo;
