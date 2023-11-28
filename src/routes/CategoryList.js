import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryField from '../components/Champion'
import Loading from '../components/Loading';

const BASE_URL = "https://kniemiec.pythonanywhere.com/api/"

function CategoryList() {

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${BASE_URL}category-name-value-list`);
      const newCategories = []
        result.data.data.forEach((categoryInfo, index) => {
            const {category, name} = categoryInfo
            newCategories.push({
                category : category,
                name: name.replace(/\s/g, '')
            })
        })
        setCategories(newCategories);
        setIsLoading(false)
    };
    
    fetchData();
  }, []);

  if (isLoading){
    return <Loading />
  }
    return (
    (
        <div className='h-full'>
            {categories.map((categoryInfo, index) => (
                <div className='bg-slate-50 text-xl flex'>
                    <img src={`${categoryInfo.category}/${categoryInfo.name.trim()}.png`} className='h-16 w-16'/>
                    <h1>{categoryInfo.category} {categoryInfo.name}</h1>
                </div>
            ))}
        </div>
    )
    )
}

export default CategoryList;
