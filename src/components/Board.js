import React from 'react';
import { connect } from 'react-redux';

const Board = ({values, clickState, editState, dispatch}) => {

    const handleClick = (e) => {
        dispatch({
            type: 'TOGGLE_CELL',
            index: e.target.id
        });
    }

    const handleKeyPress = (e) => {
        e.preventDefault();
        const value = parseInt(e.key, 10);

        if (!(value > 0 && value < 10)) { return }

        dispatch({
            type: 'ADD_CELL_VALUE',
            index: e.target.id,
            value: value
        });
    }

    return (
        <div className="box-container">
        {values.map((boxes, boxIterator) => {
            return(
                <div className="box" key={boxIterator}>
                {boxes.map((item, cellIterator) => {
                    const className = clickState[boxIterator*9 + cellIterator] ? "cell typable" : "cell";
                    const index = boxIterator*9 + cellIterator;

                    if (editState[index]) {
                        return (
                            <button className = {className} id = {index} key = {index} onClick = {(e) => handleClick(e)} onKeyPress={(e) => handleKeyPress(e)}>
                                {item}
                            </button>
                        )
                    } else {
                        return (
                            <button className = {className} id = {index} key = {index}>
                                {item}
                            </button>
                        )
                    }
                })}
                </div>
            )
        })}
    </div>
    );
};

const mapStateToProps = (state) => {
    return {
        values: state.values,
        clickState: state.clickState,
        editState: state.editState
    };
};

export default connect(mapStateToProps)(Board);
