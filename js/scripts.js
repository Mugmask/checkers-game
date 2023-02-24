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
        token.id = "token-" + row + column;
        token.onclick = showPossibleMove.bind(this, token, row, column);
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

function showPossibleMove(token, row, column) {
  const posiblesMoves = [
    checkersBoard.children[row + 1].children[column + 1],
    checkersBoard.children[row + 1].children[column - 1],
  ];

  posiblesMoves.forEach((x) => {
    if (x) x.style.backgroundColor = "red";
  });
}
