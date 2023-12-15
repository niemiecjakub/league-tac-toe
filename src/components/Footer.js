import { Link } from "react-router-dom";
import GithubIcon from "../components/svgIcons/GithubIcon";

function Footer() {
  return (
    <div className="bg-league-blue-700 w-full h-full text-white font-black font-leagueheavy my-6">
      <div className="flex flex-col w-full justify-center items-center">
        <span className="text-xs text-center mx-4 my-2">
          All images and logos are property of their respective owners and are
          used for identification purposes only
        </span>
        <Link
          to="https://github.com/niemiecjakub/league-tac-toe"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon className="h-8 w-8  cursor-pointer" />
        </Link>
        <span className="text-xs">© 2023</span>
      </div>
    </div>
  );
}

export default Footer;
