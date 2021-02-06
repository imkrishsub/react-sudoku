import React from "react";
import { connect } from "react-redux";
import classNames from 'classnames';
import { ADD_VALUE, DELETE_VALUE, TOGGLE_CELL } from "../redux/actionTypes";
import { fetchPuzzle } from "../redux/actions";

class Board extends React.Component {

    componentWillMount() {
        const { dispatch } = this.props

        dispatch(fetchPuzzle());
    }

    handleClick = (e) => {
        const { dispatch } = this.props

        dispatch({
            type: TOGGLE_CELL,
            index: e.target.id
        });
    }

    handleKeyDown = (e) => {
        const { dispatch } = this.props

        if (e.key === "Backspace" || e.key === "Delete") {
            dispatch({
                type: DELETE_VALUE,
                index: e.target.id
            });
        } else{
            const value = parseInt(e.key, 10);

            if (!(value > 0 && value < 10)) { return }

            dispatch({
                type: ADD_VALUE,
                index: e.target.id,
                value: value
            });
        }

        e.preventDefault();
    }



    render() {
        const {values, clickState, editState, highlightState, numberHighlightState } = this.props

        return (
            <div className="box-container">

            {values.map((boxes, boxIterator) => {
                return(
                    <div className="box" key={boxIterator}>
                    {boxes.map((item, cellIterator) => {
                        const index = boxIterator*9 + cellIterator;
                        const btnClassName = classNames({
                            cell: true,
                            "highlighted": highlightState[index],
                            "typable": clickState[index] && editState[index],
                            "not-editable": !editState[index],
                            "highlighted-numbers": numberHighlightState[index]
                        });

                        if (editState[index]) {
                            return (
                                <button className = {btnClassName} id = {index} key = {index} onClick = {(e) => this.handleClick(e)} onKeyDown={(e) => this.handleKeyDown(e)}>
                                    {item === 0 ? null : item}
                                </button>
                            )
                        } else {
                            return (
                                <button className = {btnClassName} id = {index} key = {index} onClick = {(e) => this.handleClick(e)}>
                                    {item === 0 ? null : item}
                                </button>
                            )
                        }
                    })}
                    </div>
                )
            })}
        </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        values: state.values,
        clickState: state.clickState,
        editState: state.editState,
        highlightState: state.highlightState,
        numberHighlightState: state.numberHighlightState
    };
};

export default connect(mapStateToProps)(Board);
