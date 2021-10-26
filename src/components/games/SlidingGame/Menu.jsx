// var Menu = React.createClass({
//   nextClickHandler: function () {
//     this.props.next();
//   },
//   hintClickHandler: function () {
//     this.props.hint();
//   },
// solveClickHandler: function() {
//     this.props.solve();
// },
// render: function() {
//   return (
//       <div id="menu">
//           <button disabled={this.props.isSolved} onClick={this.hintClickHandler}>I need a hint</button>
//           <button disabled={this.props.isSolved} onClick={this.solveClickHandler}>Solve it for me</button>
//           <button onClick={this.nextClickHandler}>Next puzzle, please</button>
//       </div>
//   );
// }
// });

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
      <button onClick={nextClickHandler}>Next puzzle, please</button>
    </div>
  );
}

export default Menu;
