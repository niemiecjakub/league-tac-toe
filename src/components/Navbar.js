import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFieldOnline } from "../redux/slices/GameSlice"

function Navbar() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      setFieldOnline({
        opponentLeft: true,
      })
    );
  };

  return (
    <div className="bg-league-blue-700 flex items-center justify-center h-16 text-league-gold-400 text-4xl font-black font-leagueheavy">
      <Link to="/" className="w-full" onClick={handleClick}>
        LEAGUE TAC TOE
      </Link>
    </div>
  );
}

export default Navbar;
