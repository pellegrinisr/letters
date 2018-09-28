import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';

const node = document.getElementById('root');

class Navigation extends Component {
    render() {
        return React.createElement(
            'div',
            {
                className: 'boxed-group',
                id: 'your_repos',
                role: 'navigation'
            },
            React.createElement(
                'div',
                {
                    className: 'boxed-group-action',
                },
                null
            ),
            React.createElement(
                'h3',
                {},
                'Your Repositories ',
                React.createElement(
                    'span',
                    {
                        className: 'counter'
                    },
                    this.props.numRepos
                )
            ),
            React.createElement(
                'div',
                {
                    className: 'boxed-group-inner'
                },
                null
            )
        );
    }
}

const App = React.createElement(
    Navigation,
    {
        numRepos: 180
    }   
);

render(app, node);