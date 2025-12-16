# Információk
- Tagok: Szalontai László (Projektvezető), Tóth László Gábor
- Nyelv: Magyar, Angol, Spanyol, Német
- Design: Tailwind
- Keretrendszer: Angular
- REST API Backend: PHP

# Felhasználói Főoldal elinditása (Angular)
### 1.lépés
- Első soron miután leszedtük a Githubról a projectet az adatbázist felkell tölteni a XAMPP/MYSQL szerverére az adatbázist
- Az adatbázis neve: "bookflow"
- Az adatbázis a html könyvtáron belül a src és azon belül a db könyvtárban található
- Az adatbázis `utf8mb4_general_ci` -es karakterkészletet kell alkalmazni az adatbázisra.

### 2.lépés

- A XAMPP elinditása után egy "git bash" terminált kell nyitni a Visual Studio Code-on belül és az alábbi kódókat kell beirni hogy elinditsuk a Weboldalunkat:

```bash
cd html
```
```bash
npm install
```
```bash 
npx ng serve
```
- Miután megvagyunk a terminál létrehozza általában a 4200-as portszámon a Weboldalt.

- A Weboldalt ellehet érni terminálból az alábbi linkre kell CTRL + Bal Click segitségével.
```
https://localhost:4200/
```
# Adminisztrátori Panel (WPF)




# Projekthez tartozó linkek
- https://github.com/Szalontai-Laszlo/Bookflow
- https://trello.com/b/PuFs3V01/bookflow