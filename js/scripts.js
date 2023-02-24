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
        if (
          checkersBoard.children[row].children[column].className.includes(
            "active"
          )
        ) {
          checkersBoard.children[row].children[column].appendChild(token);
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
}
