import { Link } from "react-router-dom";
import GithubIcon from "../components/svgIcons/GithubIcon";

function Navbar() {
  return (
    <div className="bg-league-blue-700 flex items-center justify-center h-16 text-league-gold-400 text-4xl font-black font-leagueheavy">
      <Link to="/" className="w-full">
        LEAGUE TAC TOE
      </Link>
    </div>
  );
}

export default Navbar;
