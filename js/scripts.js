const checkersBoard = document.getElementsByClassName("checkers-board")[0];
const allRows = document.getElementsByClassName("row-board");
const allColumns = document.getElementsByClassName("square-board");
const allTokens = document.getElementsByClassName("token");
const darkScore = document.getElementById("darkScore");
const ligthScore = document.getElementById("ligthScore");

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
  const finalPosibleMoves = possibleMove(token)[0];

  if (finalPosibleMoves.length) {
    const activeMoves = document.getElementsByClassName("possibleMovement");
    //corregir cuando tiene un movimiento y ya esta marcado en el board
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
  checkAttack(token);
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
      x.classList.remove("glowAttack");
    });
    Array.from(allligthTokens).forEach((x) => {
      const canMove = possibleMove(x)[0];
      canMove.length ? (x.style.pointerEvents = "") : null;
      canMove.length ? x.classList.add("glow") : null;
    });
  } else {
    Array.from(allligthTokens).forEach((x) => {
      x.style.pointerEvents = "none";
      x.classList.remove("glow");
      x.classList.remove("glowAttack");
    });
    Array.from(allDarkTokens).forEach((x) => {
      const canMove = possibleMove(x)[0];
      canMove.length ? (x.style.pointerEvents = "") : null;
      canMove.length ? x.classList.add("glow") : null;
    });
  }
}
function possibleMove(token) {
  const rowToken = token.parentElement.parentElement;
  const columnToken = token.parentElement;
  const rowIndexPosition = Array.from(allRows).indexOf(rowToken);
  const columnIndexPosition = Array.from(allColumns).indexOf(columnToken);
  const finalPosibleMoves = [];
  const allPosibleMoves = [];
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

  posibleRowsMoves.forEach((row) => {
    posibleColumnsMoves.forEach((column) => {
      const columnIndex = Array.from(row.children).indexOf(column);
      if (columnIndex != -1) {
        allPosibleMoves.push(Array.from(row.children)[columnIndex]);
      }
    });
  });
  if (
    !token.className.includes("queen") &&
    token.className.includes("dark") &&
    posibleRowsMoves.length > 1 &&
    posibleColumnsMoves.length == 3
  ) {
    posibleRowsMoves.pop();
    posibleColumnsMoves.pop();
  } else if (
    !token.className.includes("queen") &&
    token.className.includes("dark") &&
    posibleRowsMoves.length > 1 &&
    posibleColumnsMoves.length > 1
  ) {
    posibleRowsMoves.pop();
    posibleColumnsMoves.pop();
    posibleColumnsMoves.pop();
  } else if (
    !token.className.includes("queen") &&
    token.className.includes("ligth") &&
    posibleRowsMoves.length > 1 &&
    posibleColumnsMoves.length > 1
  ) {
    posibleRowsMoves.shift();
    posibleColumnsMoves.shift();
    posibleColumnsMoves.shift();
  }

  posibleRowsMoves.forEach((row) => {
    posibleColumnsMoves.forEach((column) => {
      const columnIndex = Array.from(row.children).indexOf(column);
      if (columnIndex != -1 && !Array.from(row.children)[columnIndex].children.length) {
        finalPosibleMoves.push(Array.from(row.children)[columnIndex]);
      }
    });
  });

  return [finalPosibleMoves, allPosibleMoves];
}
function attack(token, victim, allPosibleMoves, evt) {
  cleanPossibleMoves();
  let selectedSquare = evt.target;
  selectedSquare.appendChild(token);
  victim.remove();
  token.className.includes("ligth")
    ? (ligthScore.innerHTML = parseInt(ligthScore.innerHTML) + 1)
    : (darkScore.innerHTML = parseInt(darkScore.innerHTML) + 1);
  allPosibleMoves.forEach((x) => (x.onclick = ""));
  tokenState(true);
  sideToMove(!token.className.includes("ligth"));
  checkAttack(token);
}
function checkAttack(token) {
  const allPosibleMoves = possibleMove(token)[1];
  const possibleEnemy = Array.from(allPosibleMoves).filter((x) => x.children.length) || null;
  possibleEnemy.forEach((x) => {
    if (x.children[0].className == token.className) return;

    const enemyIndex = Array.from(allPosibleMoves).indexOf(x);
    if (!token.className.includes("queen") && token.className.includes("dark")) {
      if (allPosibleMoves[enemyIndex + 2] && !allPosibleMoves[enemyIndex + 2].children.length) {
        allPosibleMoves[enemyIndex + 2].classList.toggle("possibleMovement");
        allPosibleMoves[enemyIndex + 2].onclick = (evt) => attack(x.children[0], token, allPosibleMoves, evt);
        tokenState(false);
        glowOnAttack(x.children[0]);
      }
    } else if (!token.className.includes("queen") && token.className.includes("ligth")) {
      if (allPosibleMoves[enemyIndex - 2] && !allPosibleMoves[enemyIndex - 2].children.length) {
        allPosibleMoves[enemyIndex - 2].classList.toggle("possibleMovement");
        allPosibleMoves[enemyIndex - 2].onclick = (evt) => attack(x.children[0], token, allPosibleMoves, evt);
        tokenState(false);
        glowOnAttack(x.children[0]);
      }
    }
  });
}
function tokenState(click) {
  Array.from(allTokens).forEach((x) => {
    if (click) {
      x.addEventListener("click", showPossibleMove);
    } else {
      x.removeEventListener("click", showPossibleMove);
    }
  });
}
function glowOnAttack(token) {
  const allDarkTokens = document.getElementsByClassName("dark");
  const allligthTokens = document.getElementsByClassName("ligth");

  Array.from(allDarkTokens).forEach((x) => {
    x.style.pointerEvents = "none";
    x.classList.remove("glow");
  });
  Array.from(allligthTokens).forEach((x) => {
    x.style.pointerEvents = "none";
    x.classList.remove("glow");
  });
  if (token.className.includes("dark")) {
    darkScore.classList.add("glow");
  } else if (token.className.includes("ligth")) {
    ligthScore.classList.add("glow");
  }
  token.style.pointerEvents = "";
  token.classList.add("glowAttack");
}
