function Rules() {
  return (
    <div className="text-white w-full">
      <h1 className="font-bold text-xl  my-2">How to play League-Tac-Toe</h1>
      <ul className="list-disc pl-5">
        <li>
          A 3 x 3 square grid is lined up with criteria like legacy, position,
          resource, rangetype and region.{" "}
        </li>
        <li>
          Place your marker, an X or O, in one of the squares if you can name
          League of Legends champion that matches the criteria across the top
          row and left hand side.
        </li>
        <li>
          The first to get three in a row, vertically, horizontally or
          diagonally, is the winner.
        </li>
        <li>
          With steal mode enabled, each player has 3 steals in total, where a
          square can be stolen that is occupied by the opposing player.
        </li>
        <li>
          Infuriate your opponent and steal a square by naming a different
          champion to the champion already in the position on the grid.
        </li>
      </ul>
    </div>
  );
}

export default Rules;
