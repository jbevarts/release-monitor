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
- endpoint for fetching release: 
`/repos/{owner}/{repo}/releases`
- the data returned contains a possibly empty array of release objects
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
        publishedAt: {date}
        releaseData: {...}
    },
]
```

## UI
tbd, react components

## Future Development Considerations
tbd, backend with eventing architecture, webhooks possibly, need to research

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

