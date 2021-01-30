import React from 'react';
import Board from './Board.js';

const Game = () => (
    <div className="game">
        <div className="game-board">
            <Board />
        </div>
        <div className="game-info">
            <div>Test</div>
            <ol>{/* TODO */}</ol>
        </div>
    </div>
);

export default Game;
