import axios from "axios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import {
    updateDestination,
    updateDeparture,
    updateTripDetails,
    addFlights,
    addHotels,
    addRestaurants,
    addAttractions,
    updateBounds,
    updateCoordinates,
    updateDepartureDetails,
    updateDestinationDetails,
    fetchFlights
} from "./actions";

jest.mock('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('redux actions', () => {
    
    const store = mockStore({});

    beforeEach(() => {
        jest.clearAllMocks();
        store.clearActions();
    })

    afterAll(() => {
        jest.resetAllMocks();
    })

    test('updateDestination', () => {
        store.dispatch(updateDestination('testDest'));

        expect(store.getActions()).toEqual([{type: 'UPDATE_DESTINATION', payload: 'testDest'}])
    })

    test('updateDeparture', () => {
        store.dispatch(updateDeparture('testDep'));

        expect(store.getActions()).toEqual([{type: 'UPDATE_DEPARTURE', payload: 'testDep'}])
    })

    test('updateTripDetails', () => {
        store.dispatch(updateTripDetails({tripCardId: 1, tripId: 2, departureDate: 3, returnDate: 4}))

        expect(store.getActions()).toEqual([{type: 'UPDATE_TRIP_DETAILS', payload: {tripCardId: 1, tripId: 2, departureDate: 3, returnDate: 4}}])
    })

    test('addFlights', () => {
        store.dispatch(addFlights('f'));

        expect(store.getActions()).toEqual([{type: 'ADD_FLIGHTS', payload: 'f'}])
    })

    test('addHotels', () => {
        store.dispatch(addHotels('h'));

        expect(store.getActions()).toEqual([{type: 'ADD_HOTELS', payload: 'h'}])
    })

    test('addRestaurants', () => {
        store.dispatch(addRestaurants('r'));

        expect(store.getActions()).toEqual([{type: 'ADD_RESTAURANTS', payload: 'r'}])
    })
    
    test('addAttractions', () => {
        store.dispatch(addAttractions('a'));

        expect(store.getActions()).toEqual([{type: 'ADD_ATTRACTIONS', payload: 'a'}])
    })

    test('updateBounds', () => {
        store.dispatch(updateBounds('b'));

        expect(store.getActions()).toEqual([{type: 'UPDATE_BOUNDS', payload: 'b'}])
    })

    test('updateCoordinates', () => {
        store.dispatch(updateCoordinates('c'));

        expect(store.getActions()).toEqual([{type: 'UPDATE_COORDINATES', payload: 'c'}])
    })

    test('updateDepartureDetails', () => {
        store.dispatch(updateDepartureDetails('a', 'b', 'c'));

        expect(store.getActions()).toEqual([{type: 'UPDATE_DEPARTURE_DETAILS', payload: {city: 'a', country: 'b', countryCode: 'c'}}])
    })

    test('updateDestinationDetails', () => {
        store.dispatch(updateDestinationDetails('a', 'b', 'c'));

        expect(store.getActions()).toEqual([{type: 'UPDATE_DESTINATION_DETAILS', payload: {city: 'a', country: 'b', countryCode: 'c'}}])
    })

    // test('fetchFlights', () => {
    //     axios.get.mockReturnValueOnce([{name: 'London', country_code: 'GB', code: 'LON'}])
    //                 .mockReturnValueOnce([{city_code: 'LON', iata_type: 'airport', flightable: true, code: 'LHR'}])
    //                 .mockReturnValueOnce([{name: 'Paris', country_code: 'FR', code: 'PAR'}])
    //                 .mockReturnValueOnce([{city_code: 'PAR', iata_type: 'airport', flightable: true, code: 'CDG'}])
    //                 .mockReturnValue([{dep: 'LHR', arr: 'CDG'}]);

    //     const flights = fetchFlights('London', 'GB', 'Paris', 'PAR');

    //     expect(flights).toEqual([{dep: 'LHR', arr: 'CDGG'}]);
    // })
})
