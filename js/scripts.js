const checkersBoard = document.getElementsByClassName("checkers-board")[0];
placeTokenToBoard();

function placeTokenToBoard() {
  for (let row = 0; row < checkersBoard.children.length; row++) {
    for (
      let column = 0;
      column < checkersBoard.children[row].children.length;
      column++
    ) {
      if (row <= 2) {
        const token = document.createElement("div");
        token.className = "token dark";
        token.id = "row=" + row + "&col=" + column;
        token.addEventListener("click", showPossibleMove.bind(this, token));
        if (
          checkersBoard.children[row].children[column].className.includes(
            "active"
          )
        ) {
          checkersBoard.children[row].children[column].appendChild(token);
        }
      } else if (row >= 5) {
        const token = document.createElement("div");
        token.className = "token ligth";
        token.id = "row=" + row + "&col=" + column;
        token.addEventListener("click", showPossibleMove.bind(this, token));
        if (
          checkersBoard.children[row].children[column].className.includes(
            "active"
          )
        ) {
          checkersBoard.children[row].children[column].appendChild(token);
        }
      }
    }
  }
}
function showPossibleMove(token) {
  const activeMoves = document.getElementsByClassName("possibleMovement");
  let actualPosition = stringToPosition(token.id);
  const posiblesMoves = token.classList.contains("dark")
    ? [
        checkersBoard.children[actualPosition.row + 1].children[
          actualPosition.col - 1
        ] &&
        checkersBoard.children[actualPosition.row + 1].children[
          actualPosition.col - 1
        ].children.length == 0
          ? checkersBoard.children[actualPosition.row + 1].children[
              actualPosition.col - 1
            ]
          : null,
        checkersBoard.children[actualPosition.row + 1].children[
          actualPosition.col + 1
        ] &&
        checkersBoard.children[actualPosition.row + 1].children[
          actualPosition.col + 1
        ].children.length == 0
          ? checkersBoard.children[actualPosition.row + 1].children[
              actualPosition.col + 1
            ]
          : null,
      ].filter(Boolean)
    : [
        checkersBoard.children[actualPosition.row - 1].children[
          actualPosition.col - 1
        ] &&
        checkersBoard.children[actualPosition.row - 1].children[
          actualPosition.col - 1
        ].children.length == 0
          ? checkersBoard.children[actualPosition.row - 1].children[
              actualPosition.col - 1
            ]
          : null,
        checkersBoard.children[actualPosition.row - 1].children[
          actualPosition.col + 1
        ] &&
        checkersBoard.children[actualPosition.row - 1].children[
          actualPosition.col + 1
        ].children.length == 0
          ? checkersBoard.children[actualPosition.row - 1].children[
              actualPosition.col + 1
            ]
          : null,
      ].filter(Boolean);
  if (
    !posiblesMoves.every((item) =>
      item ? Array.from(activeMoves).includes(item) : null
    )
  ) {
    cleanPossibleMoves();
    posiblesMoves.forEach((x, i) => {
      if (x) {
        side = i ? "+" : "-";
        x.classList.toggle("possibleMovement");
        x.onclick = tokenToPossibleMove.bind(this, token, side, posiblesMoves);
      }
    });
  } else {
    cleanPossibleMoves();
  }
}
function tokenToPossibleMove(token, side, posiblesMoves, evt) {
  let selectedSquare = evt.target;
  let position = stringToPosition(token.id);
  position.row = token.classList.contains("dark")
    ? position.row + 1
    : position.row - 1;
  position.col = side == "+" ? position.col + 1 : position.col - 1;
  selectedSquare.addEventListener("click", null);
  selectedSquare.appendChild(token);
  token.id = "row=" + position.row + "&col=" + position.col;
  posiblesMoves.forEach((x) => (x.onclick = ""));
  cleanPossibleMoves();
}
function cleanPossibleMoves() {
  const activeMoves = document.getElementsByClassName("possibleMovement");

  Array.from(activeMoves).forEach((activeMove) => {
    activeMove.classList.remove("possibleMovement");
  });
}
function stringToPosition(string) {
  const params = new URLSearchParams(string);
  const obj = {};
  for (const [key, value] of params.entries()) {
    obj[key] = parseInt(value, 10);
  }
  return obj;
}
function removeClickEvents() {
  let posibleClickEvents = document.getElementsByClassName("active");
  Array.from(posibleClickEvents).forEach((x) => {
    x.removeEventListener("click", null);
  });
}
