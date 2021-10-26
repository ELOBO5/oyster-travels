# Oyster Travels

A fun travel planning app that anyone can use to look up hotels, restaurants and attractions in a location of their choosing. You can create a trip card with your preferences added and share the link to your trip card with friends. Friends can share their thoughts on suggested experiences using the comment section below or by voting using the like/dislike button on different elements of the trip.

## Installation & Usage

- Clone or download the repo.
- Open terminal and navigate to `oyster-travels` folder.

### Client
- Cd into `client` folder.
- Run `npm install` to install dependencies.
- Run `npm start` and open http://localhost:3000 to view the app in the browser.

### Server
- Cd into `server` folder. 
- Run `pipenv shell` to activate virtual environment.
- Run `pipenv install` to install dependencies.
- Cd into `oyster` project folder.
- Run `python manage.py runserver` to start server.
- Open http://localhost:8000/api/ to view the app.

## Technologies 

<details>
  <summary>Frontend</summary>
  <br>
  <ul>
    <li>HTML5</li> 
    <li>CSS3</li> 
    <li>JavaScript</li> 
    <li><a href="https://reactjs.org/">React</a></li> 
    <li><a href="https://react-redux.js.org/">React Redux</a></li> 
    <li><a href="https://testing-library.com/">React Testing Library</a></li> 
    <li><a href="https://jestjs.io/">Jest</a></li> 
  </ul>
</details>

<details>
<summary>Backend</summary>
  <br>
  <ul>
    <li>Python</li> 
    <li><a href="https://www.djangoproject.com/">Django</a></li> 
    <li><a href="https://docs.pytest.org/">Pytest</a></li> 
  </ul>
</details>

## Process
- Brainstormed ideas for app.
- Created User Stories and DB Schema using Db Designer.
- Designed initial layout of the webpages on Miro.
- Researched external APIs (Aviation Stack, Google Places, Travel Advisor).
- Created models, serializers and viewsets using Django REST framework.
- Created redux store, pages and components on front-end.
- Implemented Auth using Django REST Simple JWT plugin.
- Connected the front-end and the back-end.
- Tested with Jest and Pytest.
- Debug and final styling.
- Deployed app on Heroku.

## Licence 
* [License](https://opensource.org/licenses/mit-license.php)
