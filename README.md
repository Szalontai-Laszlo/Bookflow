# Információk
- Tagok: Szalontai László (Projektvezető), Tóth László Gábor
- Nyelv: Magyar, Angol, Spanyol, Német
- Design: Tailwind
- Keretrendszer: Angular
- REST API Backend: PHP

# Felhasználói Főoldal elinditása (Angular)
### 1.lépés
- Első soron miután leszedtük a Githubról a projectet az adatbázist felkell tölteni a XAMPP/MYSQL szerverére
- Az adatbázis neve: "bookflow"
- Az adatbázis a html könyvtáron belül az src és azon belül a db könyvtárban található
- Az adatbázishoz `utf8mb4_general_ci` karakterkészletet kell alkalmazni a megfelelő futás érdekében.

### 2.lépés

- Miután megnyitottuk a XAMPP-ot, illetve a projekt futásához szükséges dolgokat letöltöttük, amihez "git bash" terminált kell elindítani a Visual Studio Code-on belül, majd az alábbi kódot beírni:
- `FONTOS: az oldalhoz tartozó, projekt futásához szükséges dolgokat csak egyszer kell letölteni, leállítás után csak elég az 1. illetve 3. parancsot beírni`
```bash 1.
cd html
```
```bash 2.
npm install
``` 
- folytatjuk az alábbi kóddal, amivel elindítjuk magát a weboldalt:

```bash 3.
npx ng serve
```

- Illetve ahhoz, hogy működjön az adatbázisunk, el kell indítani a server.js-t, amihez nyitni kell egy PowerShell terminál, és a következő parancsokat beírni:

```powershell 1.
cd html/server
```

```powershell 2.
node server.js
```

- Miután megvagyunk a terminál létrehozza általában a 4200-as portszámon a Weboldalt.

- A Weboldalt el lehet érni terminálból az alábbi linkre kell CTRL + Bal Click segitségével.
```
https://localhost:4200/
```
# Adminisztrátori Panel (WPF)




# Projekthez tartozó linkek
- https://github.com/Szalontai-Laszlo/Bookflow
- https://trello.com/b/PuFs3V01/bookflow