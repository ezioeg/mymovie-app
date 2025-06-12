## MyMovie App  
Mobile application developed with React Native CLI. It replicates a basic version of Netflix and consumes content from The Movie Database (TMDB) API.

### Features  
- **Home**  
  Displays a hero banner with a highlighted title and content lists filtered by Movies, Series, or Category.  
  - Categories include Drama, Horror, Comedy, Action, and more.  
  - Content sections include Trending, Top Rated, Upcoming, etc.

- **Detail View**  
  Shows thumbnail, title, release date, rating, description, trailers, related content, and cast/crew info.

- **Search**  
  Allows users to search titles and view recommendations.  
  - Results are filtered by the previously selected type (Movies or Series).
 
<details>
  <summary>📱 Android screenshots</summary>
  <p>
    <img src="https://github.com/user-attachments/assets/05466b3e-1e0f-4973-a75b-c08e46e23a85" alt="Android Screenshot 1" width="400"/>
    <img src="https://github.com/user-attachments/assets/7b25326c-349e-42e4-8bd3-8f946354ecfa" alt="Android Screenshot 2" width="400"/>
  </p>
  <p>
    <img src="https://github.com/user-attachments/assets/e03af8a6-a5b7-49e2-b290-7e94bcc130c5" alt="Android Screenshot 3" width="400"/>
    <img src="https://github.com/user-attachments/assets/fda73a60-18b7-4a76-af00-4ca0430a98db" alt="Android Screenshot 4" width="400"/>
  </p>
  <p>
    <img src="https://github.com/user-attachments/assets/0f2dc4b4-4106-40fc-acbd-8ec0c2b8952b" alt="Android Screenshot 5" width="400"/>
  </p>
</details>

<details>
  <summary>📱 iOS screenshots</summary>
  <p>
    <img src="https://github.com/user-attachments/assets/9c2f536a-463c-46c0-9289-a2af504ec881" alt="iOS Screenshot 1" width="400"/>
    <img src="https://github.com/user-attachments/assets/8d81ce98-8bff-4dfe-92ca-eec71279dee2" alt="iOS Screenshot 2" width="400"/>
  </p>
  <p>
    <img src="https://github.com/user-attachments/assets/1d048793-c026-4789-bda5-a82007b3965f" alt="iOS Screenshot 3" width="400"/>
    <img src="https://github.com/user-attachments/assets/a8c8cf8f-63a2-477f-a408-cd18ce9bbad3" alt="iOS Screenshot 4" width="400"/>
  </p>
   <p>
    <img src="https://github.com/user-attachments/assets/a5b22225-cef0-4bf5-959c-feb2a802eb01" alt="iOS Screenshot 3" width="400"/>
    <img src="https://github.com/user-attachments/assets/de71289c-c9ff-45ce-af48-d2cbd77a4370" alt="iOS Screenshot 4" width="400"/>
  </p>
</details>


## Technologies Used
### Core
- [React Native](https://reactnative.dev/) `v0.79.2`
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
Start metro:
```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

### Build and run for Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### Build and run for iOS
Before running on iOS for the first time, make sure to install CocoaPods dependencies:
```bash
cd ios
pod install
cd ..
```

Then:
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
