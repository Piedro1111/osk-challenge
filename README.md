# OSK challenge
## Úloha 1

Cieľom je vytvoriť jednoduchú **JS client-side aplikáciu na konverziu mien**.

### Požiadavky

> - Aplikácia umožňuje vybrať **východziu** a **cieľovú menu** z krátkeho zoznamu (max. 5 mien).
> - Po zadaní sumy do poľa pri východzej mene sa podľa daného kurzu **prepočíta a zobrazí suma v cieľovej mene**.
> - Obsahuje tlačidlo, ktoré **vymení východziu a cieľovú menu** a zároveň prehodí zadanú sumu.
> - Implementácia v **komponentovom frameworku** (Angular, React, Vue...) alebo pomocou **web komponentov** (bonus: použitie Lit knižnice).
> - Možno použiť existujúcu komponentovú knižnicu (napr. button, input), ale **kompozícia aplikácie a biznis logika musia byť vlastná tvorba**.
> - **Kurzové dáta** majú byť do FE aplikácie dotiahnuté **asynchrónne** (stačia statické JSON súbory, prípadne použitie free API).
>   - Inšpirácia pre formát dát: [fixer.io dokumentácia](https://fixer.io/documentation)
>   - Príklad free API: [frankfurter.dev](https://frankfurter.dev/)
> - Použitý jazyk: **JavaScript** alebo **TypeScript**.

# Installation and run in Docker

## For Linux

1. Build the Docker image:
   ```sh
   docker compose build
   ```

2. Run the application:
   ```sh
   docker compose up
   ```

3. Access the application at:
   ```
   http://localhost:4173
   ```

## For Windows

1. Open PowerShell and navigate to the project directory.

2. Build the Docker image:
   ```powershell
   docker compose build
   ```

3. Run the application:
   ```powershell
   docker compose up
   ```

4. Access the application at:
   ```
   http://localhost:4173
   ```

# Dev info

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Running Unit Tests

To run the unit tests, use the command:

```sh
npm run test:unit
```

The tests are implemented using [Vitest](https://vitest.dev/). Results will be displayed in the terminal.
