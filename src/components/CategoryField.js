import useWindowDimensions from "../hooks/useWindwResize";

function CategoryField({ categoryInfo: { category, name } }) {
  const { height, width } = useWindowDimensions();

  const imgName = name.replace(/\s/g, "").toLowerCase();

  return (
    <div
      className="flex flex-col w-1/4 items-center justify-center text-white"
      style={{ height: `${width / 4}px` }}
    >
      {/* <img
        src={`${process.env.PUBLIC_URL}/${category}/${imgName}.PNG`}
        className="h-2/4 opacity-90"
      /> */}
      <div
        className="flex justify-center items-center h-96 m-auto w-full opacity-90 bg-contain bg-no-repeat"
        style={{
          backgroundImage: `url(${window.location.origin}/${category}/${imgName}.PNG)`,
        }}
      />

      <div className="flex flex-col items-center justify-center font-league h-1/3 uppercase text-xs md:text-sm">
        <p className="">{category}</p>
        <p className="">{name}</p>
      </div>
    </div>
  );
}

export default CategoryField;
