import "@testing-library/jest-dom/extend-expect";
import { within } from "@testing-library/react";
import LandingPage from ".";
import SearchBar from '../../components/SearchBar/index.js'

jest.mock('../../components/SearchBar/index.js', () => {
    <div data-testid='searchBar'></div>
})

describe('Landing Page', () => {
    
    test('Contains search bar', () => {
        const { getByTestId } = renderWithReduxAndRouter(<LandingPage />);
        const landingPage = getByTestId('landingPage');
        console.log(landingPage);
        const searchBar = within(landingPage).getByTestId('searchBar');
        console.log(searchBar);
        expect(0).toEqual(1);
    })
})
