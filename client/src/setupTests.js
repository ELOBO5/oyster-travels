// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";

import userEvent from "@testing-library/user-event";
import { render } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import tripReducer from './redux/reducer';

const TestProviders = ({ initState }) => {
    initState ||= {
        tripId: '',
        tripCardId: '',
        departure: '',
        destination: '',
        departureDate: '',
        returnDate: '',
        flights: [],
        hotels: [],
        restaurants: [],
        attractions: [],
    
        // Related to Flights
        departureCity: '',
        departureCountry: '',
        departureCountryCode: '',
    
        destinationCity: '',
        destinationCountry: '',
        destinationCountryCode: '',
    
        // Related to Places API
        bounds: {},
        coordinates: {}
    };

    const testReducer = () => tripReducer(initState, { type: '@@INIT' })
    const testStore = createStore(testReducer, applyMiddleware(thunk))

    return ({ children }) => (
        <Provider store={testStore}>
            <Router>
                { children }
            </Router>
        </Provider>
    )
}

const renderWithReduxAndRouter = (uiElement, options={}) => {
    let TestWrapper = TestProviders(options)
    render(uiElement, { wrapper: TestWrapper, ...options })
}

global.renderWithReduxAndRouter = renderWithReduxAndRouter
global.React = React;
global.render = render;
global.userEvent = userEvent;
