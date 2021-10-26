import { useEffect, useRef } from "react";

function Tile(props) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (props.drawImage) {
      let context = canvasRef.current.getContext("2d");
      drawImage(context);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
