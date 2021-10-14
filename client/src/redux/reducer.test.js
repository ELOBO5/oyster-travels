import tripReducer from "./reducer";

describe('tripRducer', () => {

    test('initialises with correct initial state', () => {
        const initialState = tripReducer(undefined, {type: '@@INIT'});

        expect(initialState).toEqual({
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
        })
    })

    test('UPDATE_DESTINATION', () => {
        const fakeState = tripReducer({destination: ''}, {type: 'UPDATE_DESTINATION', payload: 'testDest'})

        expect(fakeState).toEqual({destination: 'testDest'})
    })

    test('UPDATE_DEPARTURE', () => {
        const fakeState = tripReducer({departure: ''}, {type: 'UPDATE_DEPARTURE', payload: 'testDep'})

        expect(fakeState).toEqual({departure: 'testDep'})
    })

    test('UPDATE_TRIP_DETAILS', () => {
        const fakeState = tripReducer({tripCardId: '', tripId: '', departureDate: '', returnDate: ''},
                                        {type: 'UPDATE_TRIP_DETAILS', payload: {
                                            tripCardId: 'a', tripId: 'b', departureDate: 'c', returnDate: 'd'
                                        }})
        
        expect(fakeState).toEqual({tripCardId: 'a', tripId: 'b', departureDate: 'c', returnDate: 'd'})
    })

    test('ADD_FLIGHTS', () => {
        const fakeState = tripReducer({flights: []}, {type: 'ADD_FLIGHTS', payload: [{flight: 1}, {flight: 2}]})

        expect(fakeState).toEqual({flights: [{flight: 1}, {flight: 2}]})
    })

    test('ADD_HOTELS', () => {
        const fakeState = tripReducer({hotels: []}, {type: 'ADD_HOTELS', payload: [{hot: 1}, {hot: 2}]})

        expect(fakeState).toEqual({hotels: [{hot: 1}, {hot: 2}]})
    })

    test('ADD_RESTAURANTS', () => {
        const fakeState = tripReducer({restaurants: []}, {type: 'ADD_RESTAURANTS', payload: [{rest: 1}, {rest: 2}]})

        expect(fakeState).toEqual({restaurants: [{rest: 1}, {rest: 2}]})
    })

    test('ADD_ATTRACTIONS', () => {
        const fakeState = tripReducer({attractions: []}, {type: 'ADD_ATTRACTIONS', payload: [{att: 1}, {att: 2}]})

        expect(fakeState).toEqual({attractions: [{att: 1}, {att: 2}]})
    })

    test('UPDATE_BOUNDS', () => {
        const fakeState = tripReducer({bounds: {}}, {type: 'UPDATE_BOUNDS', payload: {a: 1, b: 2}})

        expect(fakeState).toEqual({bounds: {a: 1, b: 2}})
    })

    test('UPDATE_COORDINATES', () => {
        const fakeState = tripReducer({coordinates: {}}, {type: 'UPDATE_COORDINATES', payload: {a: 1, b: 2}})

        expect(fakeState).toEqual({coordinates: {a: 1, b: 2}})
    })

    test('UPDATE_DEPARTURE_DETAILS', () => {
        const fakeState = tripReducer({departure: '', departureCity: '', departureCountry: '', departureCountryCode: ''},
                                        {type: 'UPDATE_DEPARTURE_DETAILS', payload: {
                                            city: 'a', country: 'b', countryCode: 'c'
                                        }})

        expect(fakeState).toEqual({departure: 'a, b', departureCity: 'a', departureCountry: 'b', departureCountryCode: 'c'})
    })

    test('UPDATE_DESTINATION_DETAILS', () => {
        const fakeState = tripReducer({destination: '', destinationCity: '', destinationCountry: '', destinationCountryCode: ''},
                                        {type: 'UPDATE_DESTINATION_DETAILS', payload: {
                                            city: 'a', country: 'b', countryCode: 'c'
                                        }})

        expect(fakeState).toEqual({destination: 'a, b', destinationCity: 'a', destinationCountry: 'b', destinationCountryCode: 'c'})
    })
})
