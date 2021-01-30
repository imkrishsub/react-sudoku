import React from 'react';
import { connect } from 'react-redux';

const Board = ({values, clickState, dispatch}) => {

    const handleClick = (e) => {
        console.log("handleOnClick()");
        dispatch({
            type: 'TOGGLE_CELL',
            index: e.target.id
        });
    }

    const handleKeyPress = (e) => {
        e.preventDefault();
        dispatch({
            type: 'ADD_CELL_VALUE',
            index: e.target.id,
            value: parseInt(e.key, 10)
        });
    }

    return (
        <div className="box-container">
        {values.map((boxes, boxIterator) => {
            return(
                <div className="box">
                {boxes.map((item, cellIterator) => {
                    let className = clickState[boxIterator*9 + cellIterator] ? "cell typable" : "cell";

                    return (
                        <button className = {className} id = {boxIterator*9 + cellIterator} key = {boxIterator * 9 + cellIterator} onClick = {(e) => handleClick(e)} onKeyPress={(e) => handleKeyPress(e)}>
                            {item}
                        </button>
                    )
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
        clickState: state.clickState
    };
};

export default connect(mapStateToProps)(Board);
