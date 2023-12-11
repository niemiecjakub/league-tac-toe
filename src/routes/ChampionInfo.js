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

  return (
    <div className="flex flex-col items-center justify-center h-full px-2 m-auto space-y-4 my-4 w-full">
      <div className=" w-full text-white text-xl bg-red-900">
        <img
          alt={data.key}
          src={`${window.location.origin}/icons/${data.key}.PNG`}
          className="h-full mr-2"
        />
        {data.name}, {data.title}
      </div>
    </div>
  );
}

export default ChampionInfo;
