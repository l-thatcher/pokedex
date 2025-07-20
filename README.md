# Pokedex

A modern, mobile-friendly Pokedex app built with Expo, React Native, and TypeScript. Browse, search, and favorite Pokémon.

## Features

- 🔍 **Search Pokémon** by name
- ⭐ **Favorite Pokémon** and view your favorites list
- 📊 **Detailed Pokémon stats** including species, height, weight, and base stats
- 🎨 **Modern UI** with Tailwind CSS (via NativeWind)
- 🗂️ **Persistent favorites and recents** using Redux state management, and local storage with AsyncStorage
- 🗂️ **Expo router page navigation** navigation between pages is handled using Expo routing

## Tech Stack

- [Expo](https://expo.dev/) (React Native)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- [PokéAPI](https://pokeapi.co/) for Pokémon data

## Getting Started

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Start the Expo development server:**

   ```sh
   npx expo start
   ```

3. **Run on your device:**
   - Use the Expo Go app (iOS/Android) or an emulator.
   - It has been tested for iphone.

## Project Structure

- `app/` — Main app code (screens, navigation, store, API calls)
- `components/` — Reusable UI components
- `interfaces/` — TypeScript interfaces for Pokémon data
- `assets/` — Fonts and images

## Customization

- **Tailwind config:** Edit `tailwind.config.js`
- **Fonts:** Add to `assets/fonts/` and update config as needed

## Contributing

Pull requests and issues are welcome!

## License

MIT
