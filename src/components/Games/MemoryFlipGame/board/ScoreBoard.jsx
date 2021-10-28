import styled from "styled-components";

function ScoreBoard(props) {
  return (
    <ScoreBoardWrapper>
      <div className="block">
        <label>Moves</label>
        <span>{props.moves}</span>
      </div>
    </ScoreBoardWrapper>
  );
}

export default ScoreBoard;

const ScoreBoardWrapper = styled.div`
  .block {
    background: #a8a8a8;
    border: none;
    text-align: center;
    margin-bottom: 15px;
    border-radius: 4px;
    padding: 5px;

    label {
      display: block;
      text-transform: uppercase;
      color: $accentColor;
      font-weight: bold;
      font-size: 1.2em;
    }
    span {
      display: block;
      color: $accentColor;
      font-weight: bold;
      font-size: 1.5em;
    }
  }
`;
