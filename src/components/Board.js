import React from 'react';
import Cell from './Cell.js';

class Board extends React.Component {

  renderCell(i) {
    return <Cell value={i}/>;
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  render() {
      let elements = Array(9); // Create cell entries programmatically

      for (var i = 0; i < elements.length; i++) {
          elements[i] = Array(9);

          for (var j = 0; j < elements[i].length; j++) {
              elements[i][j] = this.getRandomInt(1, 10);
          }
      }
      return (
        <div className="box-container">
            {elements.map(function(boxes, boxIterator) {
                return <div className="box">
                {boxes.map(function(item, cellIterator) {
                    return <Cell value={item} key={boxIterator * 9 + cellIterator} />
                })}
                </div>
            })}
        </div>
    );
  }
}

export default Board;
