# RexDev Web App

## Overview
This project is a React web application built with Vite and Material UI. It consumes an API and includes routing, theming, and basic component structure.

## Getting Started
### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation
1. Clone the repository:
    ```
    git clone https://github.com/your-username/my-app.git
    cd my-app
    ```
2. Install dependencies:
    ```
    npm install
    ```


### Running the App
To start the development server, run:
```
npm run dev
```
The app will be available at http://localhost:5173.


### Building for Production
To build the app for production, run:
```
npm run build
```
The output will be in the dist directory.


## Project Structure
```
my-app/
├── public/
├── src/
│   ├── components/
│   │   ├── primary/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ...
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── List.jsx
│   │   │   └── ...
│   │   └── ...
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   └── ...
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
├── package.json
└── ...
```

## Key Libraries
- React Router: For routing.
    ```
    npm install react-router-dom
    ```

- Axios: For making API requests.
    ```
    npm install axios
    ```

- Formik and Yup: For form handling and validation.
    ```
    npm install formik yup
    ```

- React Query: For data fetching and caching.
    ```
    npm install @tanstack/react-query
    ```

### Theming
We use Material UI for theming. The theme is defined in main.jsx:
```jsx
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});
```


# Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

# License
This project is licensed under the MIT License.