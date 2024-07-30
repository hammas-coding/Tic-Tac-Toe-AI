import React, { useState, useEffect } from "react";
import Board from "./Board";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import styles from "./Game.module.css";

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isAgainstAI, setIsAgainstAI] = useState(true);

  useEffect(() => {
    if (!xIsNext && isAgainstAI && !calculateWinner(squares)) {
      const aiMove = calculateAiMove(squares);
      if (aiMove !== -1) {
        handleClick(aiMove);
      }
    }
  }, [xIsNext]);

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const calculateAiMove = (squares) => {
    const minimax = (newSquares, depth, isMaximizing) => {
      const winner = calculateWinner(newSquares);
      if (winner) {
        return winner === "O" ? 10 - depth : depth - 10;
      }
      if (newSquares.every((square) => square !== null)) {
        return 0;
      }

      if (isMaximizing) {
        let maxEval = -Infinity;
        for (let i = 0; i < newSquares.length; i++) {
          if (newSquares[i] === null) {
            newSquares[i] = "O";
            const evaluation = minimax(newSquares, depth + 1, false);
            newSquares[i] = null;
            maxEval = Math.max(maxEval, evaluation);
          }
        }
        return maxEval;
      } else {
        let minEval = Infinity;
        for (let i = 0; i < newSquares.length; i++) {
          if (newSquares[i] === null) {
            newSquares[i] = "X";
            const evaluation = minimax(newSquares, depth + 1, true);
            newSquares[i] = null;
            minEval = Math.min(minEval, evaluation);
          }
        }
        return minEval;
      }
    };

    let bestMove = -1;
    let bestValue = -Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = "O";
        const moveValue = minimax(squares, 0, false);
        squares[i] = null;
        if (moveValue > bestValue) {
          bestMove = i;
          bestValue = moveValue;
        }
      }
    }
    return bestMove;
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (squares.every((square) => square !== null)) {
    status = "Match tied";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const handleModeChange = (mode) => {
    setIsAgainstAI(mode === "ai");
    handleReset();
  };

  return (
    <Container className={`text-center mt-4 ${styles.mainContainer}`}>
      <h1 className="mb-4">Tic-Tac-Toe</h1>
      <Card className={styles.mainDiv}>
        <Row className="mb-3" style={{ width: "100%" }}>
          <Col>
            <Button
              onClick={() => handleModeChange("ai")}
              className={
                isAgainstAI
                  ? styles.button
                  : [styles.button, styles.buttonDisabled]
              }
            >
              Against AI
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => handleModeChange("2p")}
              className={
                !isAgainstAI
                  ? styles.button
                  : [styles.button, styles.buttonDisabled]
              }
            >
              Player 2
            </Button>
          </Col>
        </Row>
        <Board squares={squares} onClick={handleClick} />
        <div className="status my-3">{status}</div>
      </Card>
      <Button
        variant="danger"
        onClick={handleReset}
        className={styles.resetButton}
      >
        Reset Game
      </Button>
    </Container>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Game;
