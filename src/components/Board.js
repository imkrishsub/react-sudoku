import React from 'react';
import Cell from './Cell.js';
import store from '../store';

class Board extends React.Component {
  render() {
      let state = store.getState();
      let elements = state.values;
      return (
        <div className="box-container">
            {elements.map(function(boxes, boxIterator) {
                return <div className="box">
                {boxes.map(function(item, cellIterator) {
                    return <Cell value={item} id = {boxIterator * 9 + cellIterator} key={boxIterator * 9 + cellIterator} />
                })}
                </div>
            })}
        </div>
    );
  }
}

export default Board;
