import React from "react";
import Square from "./Square";
import { Container, Row, Col } from "react-bootstrap";

const Board = ({ squares, onClick }) => {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  return (
    <Container className="board-container">
      <Row className="board-row">
        <Col className="p-0">{renderSquare(0)}</Col>
        <Col className="p-0">{renderSquare(1)}</Col>
        <Col className="p-0">{renderSquare(2)}</Col>
      </Row>
      <Row className="board-row">
        <Col className="p-0">{renderSquare(3)}</Col>
        <Col className="p-0">{renderSquare(4)}</Col>
        <Col className="p-0">{renderSquare(5)}</Col>
      </Row>
      <Row className="board-row">
        <Col className="p-0">{renderSquare(6)}</Col>
        <Col className="p-0">{renderSquare(7)}</Col>
        <Col className="p-0">{renderSquare(8)}</Col>
      </Row>
    </Container>
  );
};

export default Board;
