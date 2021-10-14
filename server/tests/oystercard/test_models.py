from oystercard import models as md

class TestModels:
    
    def test_Trip(self):
        trip = md.Trip(destination='New York')
        
        assert str(trip) == 'New York'
    
    def test_Flight(self):
        flight = md.Flight(location='London', destination='New York', departure_airport='LHR', arrival_airport='JFK')

        assert str(flight) == 'Flight from London to New York'

    def test_Experience(self):
        experience = md.Experience(category='hotel', name='exname')

        assert str(experience) == 'Hotel - exname'
