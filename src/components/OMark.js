function OMark({ championName }) {
  return (
    <>
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={"w-10 md:w-24 fill-transparent"}
      >
        <path
          d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
          stroke="#FFFFFF"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <h1 className="absolute bottom-0 text-center uppercase text-white font-leagueheavy text-sm md:text-2xl">
        {championName}
      </h1>
    </>
  );
}

export default OMark;
