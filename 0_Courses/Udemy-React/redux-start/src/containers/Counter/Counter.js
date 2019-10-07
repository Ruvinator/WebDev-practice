import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                {/* Instead of accessing class state, redux state now gives access to global props.ctr */}
                <CounterOutput value={this.props.ctr} />
                {/* Use redux-defined actions in clicked property to update redux state (accessed in props) */}
                {/* Dispatching happens here using the defined actions */}
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter}  />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.res.map(strResult => {
                        return <li key={strResult.id} onClick={() => this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>
                    })}
                </ul>
            </div>
        );
    }
}

// To set up subscription, pass output object into `connect` method from react-redux
// `connect()` takes two arguments: actions we want to dispatch and state we want to get

// State we want to get:
// Accesses global (redux) state for properties this component is interested in
const mapStateToProps = state => {
    return {
        // Accessing properties from multiple reducers
        ctr: state.counterReducer.counter,
        res: state.resultReducer.results
    };
};

// Actions to dispatch:
const mapDispatchToProps = dispatch => {
    return {
        // Using action creators; function called to create the action
        onIncrementCounter:  () => dispatch(actionTypes.increment()),
        onDecrementCounter:  () => dispatch(actionTypes.decrement()),
        // Can add any properties (here `value`) and connect to object in this file
        onAddCounter:        () => dispatch(actionTypes.add(5)),
        onSubtractCounter:   () => dispatch(actionTypes.subtract(5)),
        onStoreResult: (result) => dispatch(actionTypes.storeResult(result)),
        onDeleteResult:    (id) => dispatch(actionTypes.deleteResult(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);