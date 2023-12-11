function Rules() {
  return (
    <div className="text-white w-full">
      <h1 className="font-bold text-xl  my-2">How to play League-Tac-Toe</h1>
      <h2 className="font-bold text-xl my-2">Here's the rules:</h2>

      <p>
        {" "}
        A three by 3 square grid is lined up with criteria like football clubs,
        nations, trophies and awards.{" "}
      </p>

      <p>
        {" "}
        Place your marker, an X or O, in one of the squares if you can name a
        football player that matches the criteria across the top row and left
        hand side.
      </p>
      <p>
        {" "}
        The first to get three in a row, vertically, horizontally or diagonally,
        is the winner.
      </p>
      <p>
        {" "}
        With steal mode enabled, each player has 3 steals in total, where a
        square can be stolen that is occupied by the opposing player.
      </p>
      <p>
        {" "}
        Infuriate your opponent and steal a square by naming a different player
        to the footballer already in the position on the grid.
      </p>
    </div>
  );
}

export default Rules;
