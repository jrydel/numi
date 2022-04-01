# London Business Finder Challenge

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Imagine you're on a team with a more junior developer who has a cool idea for a product that finds business in london and shows
them on a map. He's got a proof of concept but needs help cleaning it up.

## Running the App

Runs the app in the development mode using `yarn start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## The Task

We need your help getting this app ready for production.
Your tasks:

### Search Functionality

-   Eliminate the lag on the search response time
-   Make the search bar focused on locations in London (for some reason it's currently showing results where the user is?)
-   The search results also seem to show all types of locations. Can we please only show business locations?
-   When we render a search result, show what type of place it is (eg "bar", "lodging", "library", "cafe", "casino", "pharmacy")

### UI

-   Make the toast only pop up once per query, and make sure it doesn't pop up when the query field is empty
-   Show the search results on a static map [using this API](https://developers.google.com/maps/documentation/maps-static/overview)

### Code Cleanup

-   Clean up the console so it doesn't output any more warnings or errors
-   Fix the code so the terminal doesn't show any compile warnings, as these will break the build process for CI
-   Document what the code does so that future engineers can quickly understand what it does
