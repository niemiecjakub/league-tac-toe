import { Link } from "react-router-dom";

function PageCard({ to, title, subtext }) {
  return (
    <Link
      to={to}
      className="bg-league-gold-300 h-56 lg:h-96 w-full flex flex-col place-items-center rounded-lg shadow-xl drop-shadow-md"
    >
      <div className="bg-league-grey-150 w-full h-2/3 rounded-t-lg"></div>
      <div className="w-full flex h-1/3 items-center justify-between p-2 md:p5">
        <div className="flex flex-col">
          <p className="text-xl font-bold">{title}</p>
          <p>{subtext}</p>
        </div>
        <button className="bg-league-gold-400 hover:bg-league-blue-100 p-3 rounded-lg font-bold text-xl ">
          Play now
        </button>
      </div>
    </Link>
  );
}

export default PageCard;
