import useWindowDimensions from "../hooks/useWindwResize";

function CategoryField({ categoryInfo: { category, name } }) {
  const { height, width } = useWindowDimensions();
  const imgName = name.replace(/\s/g, "");
  
  return (
    <div
      className="flex flex-col w-1/4 items-center justify-center text-white"
      style={{ height: `${width / 4}px` }}
    >
      <img
        src={`${process.env.PUBLIC_URL}/${category}/${imgName}.JPG`}
        className="h-2/4 opacity-90"
      />

      <div className="flex flex-col items-center justify-center font-league h-1/3 uppercase text-xs md:text-sm">
        <p>{category}</p>
        <p>{name}</p>
      </div>
    </div>
  );
}

export default CategoryField;
