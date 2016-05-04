import React, { Component } from 'react';
import { connect } from 'react-redux';
import Foo from '../components/Foo';

class FooContainer extends Component {
    render() {
        return (
            <Foo a="1" state={this.props.state} />
        );
    }
}

function mapStateToProps(state) {
  return {
    state: state
  }
}

export default connect(mapStateToProps)(FooContainer);
