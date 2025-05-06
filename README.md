# Pokedex – React App with Pokemon API

**Pokedex** is an application built as a learning project for React. It allows interaction with Pokemon fetched from the free [PokeAPI](https://pokeapi.co). The app provides features such as searching, marking favorites, arena battles, ranking, Pokemon editing, and user authentication.

## Technologies

This project uses the following modern frontend stack:

- React 18.3.1  
- Vite 6.0.1  
- React Router DOM 7.0.2  
- Tailwind CSS 3.4.16  
- React Hook Form  
- Zod (@hookform/resolvers)  
- Notistack  
- Clsx  
- React Icons  

## Features

1. **Home Page**  
   Displays a paginated list of the first 150 Pokemon from the API.  
   Includes a search bar for quick filtering by name.  
   Clicking a Pokemon shows a modal with its stats.

2. **Favorites**  
   Users can mark Pokemon as favorites using the heart button.  
   Favorite Pokemon are stored locally on the JSON-server.  
   Clicking heart again removes them from favorites.

3. **Arena**  
   Allows select two Pokemon to fight.  
   Clicking "fight" (swords) starts a battle.  
   The winner gains `win` and `experience`, the loser gains `loss`.  
   These stats are now stored in the JSON-server.

4. **Ranking**  
   A table with sortable Pokemon by available fields (e.g., name, wins, height).  
   Supports ascending and descending sorting.

5. **Edit/Create**  
   Allows editing existing Pokemon (weight, height, experience) or creating new ones (including choosing a image and setting stats).

6. **Login / Register**  
   - **Register**: creates new users, validated using Zod.  
   - **Login**: authenticates existing users via JSON-server.  
   - Notifications inform users of errors or success.

> Note: Most features require being logged in.

## Installation & Running the App

1. Clone the repository:
    ```bash
    git clone https://github.com/mojerepo/Pokedex
    ```

2. Navigate to the project folder:
    ```bash
    cd pokedex
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

5. In a second terminal, start the JSON-server:
    ```bash
    npm run json
    ```

6. Open the app in your browser:
    ```
    http://localhost:5173
    ```

## Final Notes

- The app is not yet deployed online.  