import React from 'react';
import Board from './Board.js';
import { connect } from 'react-redux';

const Game = ({isComplete}, dispatch) => {
    console.log("isComplete: " + isComplete);

    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
            <div className="game-info">
                <div>{isComplete ? "Congrats!" : "The puzzle has not been solved yet!"}</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isComplete: state.isComplete
    };
};

export default connect(mapStateToProps)(Game);
