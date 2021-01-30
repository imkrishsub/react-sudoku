import React from 'react';
import { connect } from 'react-redux';

const Board = ({values, clickState, dispatch}) => (
    <div className="box-container">
        {values.map((boxes, boxIterator) => {
            return <div className="box">
            {boxes.map((item, cellIterator) => {
                let className = clickState[boxIterator*9 + cellIterator] ? "cell typable" : "cell";

                return <button className = {className} id = {boxIterator*9 + cellIterator} key = {boxIterator * 9 + cellIterator} onClick = {() => dispatch({
                    type: 'TOGGLE_CELL',
                    index: boxIterator*9 + cellIterator
                })}> {item}
                </button>
            })}
            </div>
        })}
    </div>
);

const mapStateToProps = (state) => {
    return {
        values: state.values,
        clickState: state.clickState
    };
};

export default connect(mapStateToProps)(Board);
