//Solution that might work : use a adjency list to store each cell of a chess board and on each one (taking them by their index x, y)
//Creates an adjency list that represents a chess board with the moves that a knight can make from each square

const MOVEMENTS = [
  [1, 2],
  [2, 1],
  [-1, -2],
  [-2, -1],
  [1, -2],
  [-2, 1],
  [-1, 2],
  [2, -1]
];

function buildChessBoard() {
  const chessBoard: any[] = [];
  const isVisited: any[] = [];

  for (let i = 0; i <= 7; i++) {
    chessBoard.push([]);
    isVisited.push([]);
    for (let j = 0; j <= 7; j++) {
      chessBoard[i].push([]);
      isVisited[i].push(false);
      MOVEMENTS.forEach((shift) => {
        const x = i + shift[0];
        const y = j + shift[1];
        if (y < 8 && y >= 0 && x < 8 && x >= 0) {
          chessBoard[i][j].push([x, y]);
        }
      });
    }
  }
  return { chessBoard, isVisited };
}

const chess = buildChessBoard();
function knightMoves(start: number[], finish: number[]) {
  function findPath() {
    const paths: any[] = [];
    const queue: [number[]] = [start];

    while (queue.length > 0) {
      const square = queue.shift();
      const nextNodes = square !== undefined ? chess.chessBoard[square[0]][square[1]] : null;
      for (const node of nextNodes) {
        paths.push({ value: node, predecessor: square });
        if (node[0] === finish[0] && node[1] === finish[1]) {
          return paths;
        }
        if (!chess.isVisited[node[0]][node[1]]) {
          chess.isVisited[node[0]][node[1]] = true;
          queue.push(node);
        }
      }
    }
  }
  const paths = findPath();
  let pointerFinish = finish;
  let pointerStart = start;
  const finalPath: [number[]] = [finish];
  paths?.reverse();
  paths?.forEach((path) => {
    if (path.value[0] === pointerFinish[0] && path.value[1] === pointerFinish[1]) {
      finalPath.push(path.predecessor);
      pointerFinish = path.predecessor;
    }
  });
  finalPath.reverse();
  return finalPath;
}

const paths = knightMoves([7, 2], [1, 5]);
console.log(paths);
