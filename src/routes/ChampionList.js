import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import Champion from '../components/Champion'

const BASE_URL = "https://kniemiec.pythonanywhere.com/api/"

function ChampionList() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${BASE_URL}champion/all`);
      setData(result.data);
      console.log(result.data)
      setIsLoading(false)
    };

    fetchData();
  }, []);
  
  if (isLoading) {
    return (
      <Loading />
    )
  } else {
    return (
        <div className='h-full'>
            {data.map((champion, index) => (
              <div className="flex flex-row justify-start items-center h-20">
                <img src={`/icons/${champion.key}.PNG`} className='h-full'/>
                <p className='my-2 font-semibold'>{champion.name}, {champion.title}</p>
              </div>
            ))}
        </div>
    );
  }
}

export default ChampionList;
