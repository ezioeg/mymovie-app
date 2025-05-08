



# My Movie App

My Movie App is a technical test using React Native CLI, where the goal is to clone a basic version of Netflix within a limited time. The project uses The Movie Database (TMDB) API to fetch and display movie and TV show data.

The app includes:

- A Home screen that displays:
  - A hero banner carousel with featured movies or shows
  - Category sections like "Trending", "Top Rated", and "Upcoming"
  - Scrollable lists of movies for each category
- A Details screen when a movie or TV show is selected, including:
  - A poster image and title
  - Release date and rating
  - Overview description
  - A list of related or recommended content

## Technologies Used

- **React Native**: 0.79.2
- **React**: 19.0.0
- **Redux Toolkit**
- **Axios**
- **Lucide Icons**: lucide-react-native
- **SVG Icons**: react-native-svg

## Setup

1. Install dependencies (in this case, React 19.0.0 is used, which may cause peer dependency warnings with some libraries):

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

### Before running on iOS for the first time, make sure to install CocoaPods dependencies:

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
