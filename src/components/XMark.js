function XMark({ championName }) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={"w-8 md:w-20 fill-white"}
      >
        <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
      </svg>

      <h1 className="absolute bottom-0 text-center uppercase text-white font-leagueheavy text-sm md:text-2xl">
        {championName}
      </h1>
    </>
  );
}

export default XMark;
