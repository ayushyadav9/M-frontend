function Menu(props) {
  const nextClickHandler = () => {
    props.next();
  };
  const hintClickHandler = () => {
    props.hint();
  };
  const solveClickHandler = () => {
    props.solve();
  };
  return (
    <div id="menu">
      <button disabled={props.isSolved} onClick={hintClickHandler}>
        I need a hint
      </button>
      <button disabled={props.isSolved} onClick={solveClickHandler}>
        Solve it for me
      </button>
      <button disabled={props.isSolved} onClick={nextClickHandler}>Reshuffle Puzzle</button>
    </div>
  );
}

export default Menu;
