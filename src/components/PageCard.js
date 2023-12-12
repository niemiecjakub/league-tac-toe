import { Link } from "react-router-dom";

function PageCard({ to, title, subtitle, showButton, imageSrc }) {
  return (
    <Link
      to={to}
      className="bg-league-gold-300 flex flex-col place-items-center rounded-lg h-48 md:h-64 w-full hover:outline hover:outline-2 hover:outline-offset-4 hover:outline-league-blue-200"
    >
      <div className="bg-league-grey-150 w-full h-2/3 rounded-t-lg">
        {imageSrc && (
          <img
            src={imageSrc}
            className="object-cover rounded-t-lg h-full w-full"
          />
        )}
      </div>
      <div className="w-full flex h-1/3 py-3 items-center justify-between p-2 md:p5">
        <div className="flex flex-col">
          <p className="text-xl font-bold">{title}</p>
          <p>{subtitle}</p>
        </div>
        {showButton && (
          <button className="bg-league-gold-400 hover:bg-league-blue-200 rounded-lg p-2 md:p-3 font-bold text-xl">
            Play now
          </button>
        )}
      </div>
    </Link>
  );
}

export default PageCard;
