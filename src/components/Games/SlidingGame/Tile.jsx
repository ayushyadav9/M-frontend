import { useEffect, useRef } from "react";

function drawTextBG(ctx, txt, font, x, y) {
  /// lets save current state as we make a lot of changes
  ctx.save();

  /// set font
  ctx.font = font;

  /// draw text from top - makes life easier at the moment
  ctx.textBaseline = "top";

  /// color for background
  ctx.fillStyle = "#fff";

  /// get width of text
  var width = ctx.measureText(txt).width;

  /// draw background rect assuming height of font
  ctx.fillRect(x, y, width, parseInt(font, 10));

  /// text color
  ctx.fillStyle = "#000";

  /// draw text on top
  ctx.fillText(txt, x, y);

  /// restore original state
  ctx.restore();
}

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
    drawTextBG(context, props.tileNumber, "40pt Calibri", 20, 30);
  };

  const clickHandler = (element) => {
    console.log(props.tileNumber);
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
