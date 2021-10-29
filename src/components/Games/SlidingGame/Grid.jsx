import Tile from "./Tile.jsx";
import FlipMove from "react-flip-move";
import { useEffect, useState } from "react";

var images = [
  "//i.giphy.com/26FPCXdkvDbKBbgOI.gif",
  "//i.giphy.com/13CoXDiaCcCoyk.gif",
  "//i.giphy.com/xWlPqPbrlkEQU.gif",
  "//i.giphy.com/QPDVAzBOnShLq.gif",
  "//i.giphy.com/13FJKNTaIiZ2lG.gif",
  "//i.giphy.com/5ZdCsQHEoCUBq.gif",
  "//i.giphy.com/BeGJ3IXngxyeY.gif",
  "//i.giphy.com/LhenEkp5EsPJe.gif",
  "//i.giphy.com/3o6UB65bfF8P1anIZ2.gif",
  "//i.giphy.com/l0NwLUVdksjwmtgLC.gif",
];

const Grid = (props) => {
  useEffect(() => {
    loadNewImage();
    // eslint-disable-next-line
  }, []);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageObject, setImageObject] = useState(null);

  const loadNewImage = () => {
    let image = new Image();
    // image.src = images[Math.floor(Math.random() * images.length)];
    image.src = props.thumbnailImg
      ? props.thumbnailImg
      : images[Math.floor(Math.random() * images.length)];

    setImageLoaded(image.complete);
    setImageObject(image);
    image.onload = function () {
      setImageLoaded(true);
    };
  };

  const tileClick = (element, position) => {
    props.moveTile(position);
  };

  if (imageObject && imageLoaded) {
    if (props.model.isSolved()) {
      return (
        <div id="grid">
          <img src={imageObject.src} width={props.gameSize} alt="Completed Puzzle" />
        </div>
      );
    } else {
      var tileWidth = imageObject.width / props.model.size;
      var tileHeight = imageObject.height / props.model.size;

      return (
        <div id="grid">
          <FlipMove duration="100">
            {props.model.tiles.map((number, currentPosition) => {
              var drawImage = number ? true : false;
              var expectedPosition = number - 1;
              var coordinates = props.model.getTileCoordinates(expectedPosition);
              return (
                <Tile
                  key={number}
                  tileNumber={number}
                  position={currentPosition}
                  coordinates={coordinates}
                  drawImage={drawImage}
                  img={imageObject}
                  width={tileWidth}
                  height={tileHeight}
                  click={tileClick}
                />
              );
            })}
          </FlipMove>
        </div>
      );
    }
  } else {
    return <div id="grid">Loading...</div>;
  }
};

export default Grid;
