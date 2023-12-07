import LoadingIcon from "./svgIcons/LoadingIcon";

function Loading({text}) {
  return (
    <div className="flex flex-col items-center justify-end h-96">
      <LoadingIcon className="animate-ping" />
      <h1 className="font-leagueheavy text-white text-3xl m-20 animate-pulse">
        {text}
      </h1>
    </div>
  );
}

export default Loading;
