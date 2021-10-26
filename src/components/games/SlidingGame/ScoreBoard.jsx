function ScoreBoard(props) {
  return (
    <div id="scoreboard">
      <div className="block">
        <label>Grid #</label>
        <span>{props.gridId}</span>
      </div>
      <div className="block">
        <label>Moves</label>
        <span>{props.moves}</span>
      </div>
    </div>
  );
}

export default ScoreBoard;
