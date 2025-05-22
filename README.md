# My Movie App
My Movie App is a technical test using React Native CLI, where the goal is to clone a basic version of Netflix within a limited time. The project uses The Movie Database (TMDB) API to fetch and display movie and TV show data.

## Features

- **Home Screen**
  - A hero banner featuring the most highlighted movie or TV show.
  - A button section to filter by Movies, Series, or Categories. When selecting Categories, a translucent overlay appears allowing users to choose genres such as Drama, Horror, Comedy, Action, among others.
  - Scrollable lists of content based on the selected section (Movies, Series, or the chosen Category), organized by: Trending, Top Rated, Upcoming and others.
- **Details Screen**
  - Thumbnail image of the poster (clickable to play the main video of the movie or series).
  - Title, release date, and rating.
  - General description of the content.
  - List of trailers and related content.
  - Cast and crew information (e.g., actors, directors, writers).
- **Search Screen**
  - Initially displays recommended content.
  - Allows searching by movie or series title.
  - Applies the previously selected filters (Movies or Series) to show relevant results.

## Technologies Used
### Core
- [React Native](https://reactnative.dev/) `0.79.2`
- [React](https://reactjs.org/) `v19.0.0`
- [React Navigation Native](https://reactnavigation.org/docs/getting-started) `v7.1.8`
- [React Navigation Native Stack](https://reactnavigation.org/docs/native-stack-navigator) `v7.3.12`
- [React Navigation Bottom Tabs](https://reactnavigation.org/docs/bottom-tab-navigator) `v7.3.12`

### UI/Styling
- [Lucide React Native](https://github.com/lucide-icons/lucide-react-native) `v0.507.0` (Icons)
- [React Native Svg](https://github.com/react-native-svg/react-native-svg) `v15.11.2`
- [React Native Linear Gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient) `v2.8.3`

### State Management
- [React Redux](https://react-redux.js.org/) `v9.2.0`
- [Redux Toolkit](https://redux-toolkit.js.org/) `v2.8.0`

### Utilities
- [Axios](https://axios-http.com/) `v1.9.0`

## Setup
Install dependencies:
> ⚠️ **Warning:** in this case, React 19.0.0 is used, which may cause peer dependency warnings with some libraries
```bash
npm install --force
   ```
   
## Run
Start the app

   ```bash
    npm start
   ```

### Run for Android
```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

Before running on iOS for the first time, make sure to install CocoaPods dependencies:
```bash
cd ios
pod install
cd ..
```

### Run for iOS
```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```
   
## Contributions
Contributions are welcome. If you wish to improve the project, please fork it and submit a pull request.

## Contact
For questions or suggestions, you can contact me at [ezioeg@gmail.com].
