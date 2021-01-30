import React from "react";
import Board from "./Board";
import { connect } from "react-redux";

const Game = ({isComplete}, dispatch) => (
    <div className="game">
        <div className="game-board">
            <Board />
        </div>
        <div className="game-info">
            <div>{isComplete ? "Congrats!" : "The puzzle has not been solved yet!"}</div>
        </div>
    </div>
);

const mapStateToProps = (state) => {
    return {
        isComplete: state.isComplete
    };
};

export default connect(mapStateToProps)(Game);
