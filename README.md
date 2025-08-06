# Welcome to My Reactjs Calculator
***

## Task

My Pokemon app is a single route ReactJS application to display pokemons list. 

## Description


**SPECIFICATIONS**

Create  application with ReactJS.

First page will display all the pokemon, with lazy loading. Each pokemon details to open in a modal aka One page solution. 

Your application will also provide a search bar to filter pokemon.

This application will use an external API, you can find the documentation a this link https://pokeapi.co/

In order to perform the request to the API, you can use Axios.

Your application needs to handle errors. (No internet/bad request.)


**Requirements:**

No more than 1 components per file.
Additional components will be in src/components/

CSS is in a file associated to the component: css for ExampleCompnonent.js will be in ExampleComponent.css.
On the css/colors/design, you can be creative.

Project will be hosted in the cloud (AWS,Gcloud, Azure.Netlify/...).
File .gitignore must remove node_modules/


**Used tools:**

- **React v19** – for building the user interface
- **Vite** – development server and build tool to run and bundle the source code
- **Node.js** – platform to run development tools (like Vite and npm)
- **npm** – package manager used to install React, Vite, and other dependencies
- **Axios** – for fetching API data
- **PokeAPI** – The RESTful Pokémon API


Code separated in 'React functional Components' with their .css in path /src/components.


**PokemonList.jsx**

    Shows many Pokémon cards in a grid.

**PokemonCard.jsx**

    Displays individual Pokémon (basic info).

**PokemonModal.jsx**

    Modal that shows full details for a selected Pokémon in popup.

**SearchBar.jsx**

    Search input to filter Pokémon by name.

**ErrorBoundary.jsx**

    Catches and displays JavaScript runtime errors in React components.

**Loader.jsx**

    Reusable loader/spinner while data is fetching.

Helper methods collected in /src/utils.



## Installation


1. Clone the repository:

    git clone https://git.us.qwasar.io/my_pokemon_app_184028_zur4fj/my_pokemon_app.git

2. cd my_pokemon_app

3. To install necessary dependencies, execute in terminal:

    npm install

Installs all the dependencies listed in package.json file - including React and Vite. It downloads the necessary packages from the npm registry and stores them in the node_modules directory.

If you’re encountering errors, before investigation deeper, execute steps:

a) Clear Node Modules:

rm -rf node_modules package-lock.json

b) Reinstall:

npm install

If errors still appear then must be investigated.

## Usage

1. To start server, execute command:

npm run dev

2. To stop server, execute command:

Ctrl + C

3. To see app - open http://localhost:5173/

4. To deploy for Netlify, execute:

npm run build

5. Upload the dist/ folder to Netlify and open link:
    


### The Core Team
Gunta

<span><i>Made at <a href='https://qwasar.io'>Qwasar SV -- Software Engineering School</a></i></span>
<span><img alt='Qwasar SV -- Software Engineering School's Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px' /></span>
