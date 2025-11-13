# Információk
- Tagok: Szalontai László (Projektvezető), Tóth László Gábor
- Nyelv: Magyar, Angol, Spanyol, Német
- Design: Tailwind
- Keretrendszer: Angular
- REST API Backend: PHP

# BookFlow
Ez a projekt generált a következő által: [Angular CLI](https://github.com/angular/angular-cli) verzió 20.3.8.

## Fejlesztői szerver

A weblap elindításához a következő lépéseket kell elvégezni:


```bash
cd mappaneve
```

```bash
npm install
```

```bash
npx ng serve
```

Ahogy a szerver elindult, nyisd meg a böngészőt és írd be: `http://localhost:4200/`. Az applikáció az összes módosítást frissíti.

## Forráskód generálás

Új komponens létrehozásához.

```bash
npx ng generate component component-név
```

A teljes listához (olyanokhoz mint `components`, `directives`, or `pipes`), futtasd:

```bash
npx ng generate --help
```

## Építés

To build the project run:

```bash
npx ng build
```

Ez lefuttatja az applikációt és menti a fájlokat a `dist/` Könyvtárba. Alapértelmezetten, A kiadásra készült példány gyorsabb és kisebb méretű.

## Rész tesztek futtatása

A karma tesztrész futtatásához : [Karma](https://karma-runner.github.io) használd a következő programot:

```bash
npx ng test
```

## Kliens-től kliens-ig tesztek
A kliens tesztekhez futtasd:

```bash
npx ng e2e
```

Az Angular Cli alapból nincsen felszerelve kliens-től kliens -ig tesztekkel ezeket a projektvezető választja

## Hozzátartozó források

További információkért és parancsokért látogass el az [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) oldalra.