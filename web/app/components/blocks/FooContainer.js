import React, { Component } from 'react';
import { connect } from 'react-redux';

class FooContainer extends Component {
    render() {
        return (
            <h5>FooConainer</h5>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
  return {
    state: state
  }
}

export default connect(mapStateToProps)(FooContainer);
