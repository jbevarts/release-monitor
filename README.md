# Release monitor v1 design

## Requirements
- Function:
  - user can add / remove github repositories to track new releases
  - user can mark a release as seen
- Display:
  - user can see tracked collection of recent releases
  - user can see most recent release date
  - user can see when a release is new
  - tracked releases are sorted by new first
- Data:
  - persistence of releases to be stored using Localstorage
    - each release to be stored
    - state to be persisted after fetch, reload and after a release has been marked as seen



- extra: design backend and persistence

## Fetching releases
- user will input owner and repository name
- the data is fetched, possibly returning an empty array of release objects
- schema: https://docs.github.com/en/free-pro-team@latest/graphql/reference/objects#release

## Persisting State
- Localstorage used to store release information.  

```
localStorage.get('release-monitor-data')
```
```
[
    {
        owner: microsoft,
        repository: vscode,
        seen: true,
        id: <release_id>,
        releaseNotes: <body of release notes>,
        releaseDate: <publish date>
    },
]
```

## UI
There were different UI considerations made.  First of all, usage of real estate on screen for this particular feature is best used for visualizing whether or not a release is new.  Therefore, the design I ended up with emphasized the visualization of the releases and only onClick does it expose the underlying release notes.  A former design had a large portion of the screen real estate dedicated to a possibly blank release notes view, and i found that sub-optimal.

## Future Development Considerations
Future Work:
- determine overlapping and resize logic for mobile and dated browsers
- possibly add more features and data to be stored from github
- clean up and decompose CSS
- improve smart and dumb component architecture and data flow
- gut localStorage
- setup cosmos db in azure
- ( not in js or ts )build event trigger function app in azure that persists data to cosmos from github webhook events
-- eventually, if sibling services require events, can introduce event grid for distributed consistency
- ( not in js or ts )build crud function app in azure with access to cosmos db
- use backend apis to manage state of web app.
- create unit, sanity, and integration tests with mocking of apis enabled and disabled.
- eventually, not in js or ts, recreate frontend logic and migrate away from js or ts.  Not needed by desired.
-- this feature could be a widget, and it also could be entirely replaced by properly integrating with github dependency graph within your organization...

---



## Available Scripts

In the project directory, you can run: 

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

