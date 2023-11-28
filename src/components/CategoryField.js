import useWindowDimensions from "../hooks/useWindwResize";

function CategoryField({categoryInfo: {category, name}}) {
  const { height, width } = useWindowDimensions();


  return (
    <div className="flex flex-col w-1/4 items-center justify-center text-white static" style={{height: `${width/4}px`}}>
      <img src={`${category}/${name.replace(/\s/g, '')}.png`} className="h-2/4 opacity-90"/>
      
      <div className="flex flex-col items-center justify-center font-league h-1/3 uppercase text-sm">
        <p className="">{category}</p>
        <p className="">{name}</p>
      </div>
    </div>
  )
}

export default CategoryField;
