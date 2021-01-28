import React from 'react';

class Cell extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button className = {"cell"} id = {this.props.id}>
                {this.props.value}
            </button>
        );
    }
}

export default Cell;
