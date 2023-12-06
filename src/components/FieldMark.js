import OIcon from "./OIcon";
import XIcon from "./XIcon";

function FieldMark({ championName, mark }) {
  return (
    <>
      {mark === "X" ? (
        <XIcon className={"w-8 md:w-10  fill-white"} />
      ) : (
        <OIcon className={"w-10 md:w-12 fill-transparent"} />
      )}
      <h1 className="absolute bottom-0 text-center uppercase text-white font-leagueheavy text-sm md:text-base">
        {championName}
      </h1>
    </>
  );
}

export default FieldMark;
