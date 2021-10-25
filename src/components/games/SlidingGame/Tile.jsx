// var React = require("react");
import { useEffect, useRef } from "react";
// import ReactDOM from "react-dom";

// var Tile = React.createClass({
//   componentDidMount: function () {
//     if (this.props.drawImage) {
//       var context = ReactDOM.findDOMNode(this).getContext("2d");
//       this.drawImage(context);
//     }
//   },
//   drawImage: function (context) {
//     context.drawImage(
//       this.props.img,
//       this.props.coordinates.x * this.props.width,
//       this.props.coordinates.y * this.props.height,
//       this.props.width,
//       this.props.height,
//       0,
//       0,
//       this.props.width,
//       this.props.height
//     );
//   },
//   clickHandler: function (element) {
//     this.props.click(element, this.props.position);
//   },
//   render: function () {
//     return (
//       <canvas
//         width={this.props.width}
//         height={this.props.height}
//         className="tile"
//         onClick={this.clickHandler}
//       ></canvas>
//     );
//   },
// });

// module.exports = Tile;

function Tile(props) {
  const canvasRef = useRef();

  useEffect(() => {
    if (props.drawImage) {
      let context = canvasRef.current.getContext("2d");
      drawImage(context);
    }
  }, []);

  const drawImage = (context) => {
    context.drawImage(
      props.img,
      props.coordinates.x * props.width,
      props.coordinates.y * props.height,
      props.width,
      props.height,
      0,
      0,
      props.width,
      props.height
    );
  };

  const clickHandler = (element) => {
    props.click(element, props.position);
  };

  return (
    <canvas
      width={props.width}
      height={props.height}
      className="tile"
      onClick={clickHandler}
      ref={canvasRef}
    ></canvas>
  );
}

export default Tile;
