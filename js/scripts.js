const checkersBoard = document.getElementsByClassName("checkers-board")[0];
const allRows = document.getElementsByClassName("row-board");
const allColumns = document.getElementsByClassName("square-board");

placeTokenToBoard();
sideToMove(true);

function placeTokenToBoard() {
  for (let row = 0; row < checkersBoard.children.length; row++) {
    for (let column = 0; column < checkersBoard.children[row].children.length; column++) {
      if (checkersBoard.children[row].children[column].className.includes("active") && (row <= 2 || row >= 5)) {
        const token = document.createElement("div");
        token.className = row <= 2 ? "token dark" : row >= 5 ? "token ligth" : "";
        token.addEventListener("click", showPossibleMove);
        checkersBoard.children[row].children[column].appendChild(token);
      }
    }
  }
}
function showPossibleMove(evt) {
  const token = evt.target;
  const rowToken = token.parentElement.parentElement;
  const columnToken = token.parentElement;
  const rowIndexPosition = Array.from(allRows).indexOf(rowToken);
  const columnIndexPosition = Array.from(allColumns).indexOf(columnToken);
  const posibleRowsMoves = [
    Array.from(allRows)[rowIndexPosition + 1],
    Array.from(allRows)[rowIndexPosition - 1],
  ].filter(Boolean);
  const posibleColumnsMoves = [
    Array.from(allColumns)[columnIndexPosition + 7],
    Array.from(allColumns)[columnIndexPosition + 9],
    Array.from(allColumns)[columnIndexPosition - 7],
    Array.from(allColumns)[columnIndexPosition - 9],
  ].filter(Boolean);

  if (token.className.includes("dark") && posibleRowsMoves.length > 1 && posibleColumnsMoves.length > 1) {
    posibleRowsMoves.pop();
    posibleColumnsMoves.pop();
    posibleColumnsMoves.pop();
  } else if (token.className.includes("ligth") && posibleRowsMoves.length > 1 && posibleColumnsMoves.length > 1) {
    posibleRowsMoves.shift();
    posibleColumnsMoves.shift();
    posibleColumnsMoves.shift();
  }
  const finalPosibleMoves = [];
  posibleRowsMoves.forEach((row) => {
    posibleColumnsMoves.forEach((column) => {
      const columnIndex = Array.from(row.children).indexOf(column);
      if (columnIndex != -1 && !Array.from(row.children)[columnIndex].children.length) {
        finalPosibleMoves.push(Array.from(row.children)[columnIndex]);
      }
    });
  });

  if (finalPosibleMoves.length) {
    const activeMoves = document.getElementsByClassName("possibleMovement");
    if (!finalPosibleMoves.every((item) => Array.from(activeMoves).includes(item))) {
      cleanPossibleMoves();
      finalPosibleMoves.forEach((x) => {
        x.classList.toggle("possibleMovement");
        x.onclick = (evt) => moveToken(token, finalPosibleMoves, evt);
      });
    } else {
      cleanPossibleMoves();
    }
  }
}
function moveToken(token, finalPosibleMoves, evt) {
  cleanPossibleMoves();
  let selectedSquare = evt.target;
  selectedSquare.appendChild(token);
  finalPosibleMoves.forEach((x) => (x.onclick = ""));

  sideToMove(!token.className.includes("ligth"));
}
function cleanPossibleMoves() {
  const activeMoves = document.getElementsByClassName("possibleMovement");

  Array.from(activeMoves).forEach((activeMove) => {
    activeMove.classList.remove("possibleMovement");
  });
  Array.from(allColumns).forEach((column) => {
    column.onclick = "";
  });
}
function sideToMove(side) {
  const allDarkTokens = document.getElementsByClassName("dark");
  const allligthTokens = document.getElementsByClassName("ligth");
  if (side) {
    Array.from(allDarkTokens).forEach((x) => {
      x.style.pointerEvents = "none";
      x.classList.remove("glow");
    });
    Array.from(allligthTokens).forEach((x) => {
      x.style.pointerEvents = "";
      x.classList.add("glow");
    });
  } else {
    Array.from(allligthTokens).forEach((x) => {
      x.style.pointerEvents = "none";
      x.classList.remove("glow");
    });
    Array.from(allDarkTokens).forEach((x) => {
      x.style.pointerEvents = "";
      x.classList.add("glow");
    });
  }
}
