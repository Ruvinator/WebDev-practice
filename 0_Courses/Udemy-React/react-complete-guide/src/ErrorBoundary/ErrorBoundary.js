import React, { Component } from 'react';

// Used to wrap App components in order to handle errors
class ErrorBoundary extends Component {

    state = {
        hasError: false,
        errorMessage: ''
    }

    // Automatically receives error info from React
    componentDidCatch = (error, info) => {
        this.setState({hasError: true, errorMessage: error});
    }

    render () {
        if (this.state.hasError) {
            return <h1>Something went wrong</h1>;
        }
        else {
            return this.props.children;
        }
    }
}

export default ErrorBoundary;