-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Jan 14. 10:30
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `bookflow`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `authors`
--

CREATE TABLE `authors` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `authors`
--

INSERT INTO `authors` (`id`, `name`) VALUES
(1, 'J. K. Rowling'),
(2, 'George Orwell'),
(3, 'J. R. R. Tolkien'),
(4, 'Agatha Christie'),
(5, 'Frank Herbert'),
(6, 'Isaac Asimov'),
(7, 'Dab Simmons');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `author_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `status` tinyint(2) NOT NULL,
  `img` varchar(50) NOT NULL,
  `description` varchar(500) NOT NULL,
  `available` tinyint(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `books`
--

INSERT INTO `books` (`id`, `title`, `author_id`, `category_id`, `status`, `img`, `description`, `available`) VALUES
(1, 'Harry Potter and the Philosophers Stone', 1, 1, 1, 'assets/books/harrypotterphilosophersstone.png', 'Egy hétköznapi fiúról szól, aki megtudja, hogy különleges helye van egy rejtett, varázslatos világban. A történet egy különleges iskolában bontakozik ki, ahol barátságok, próbák és titkok várnak rá. Könnyen befogadható, mégis egyre sötétebbé váló fantasy-univerzum nyitánya.', 1),
(2, '1984', 2, 4, 1, 'assets/books/1984.png', 'Egy nyomasztó, totalitárius jövőben játszódó regény, ahol az állam mindent lát, mindent ellenőriz, még a gondolatokat is. A könyv az egyén és a hatalom viszonyát, az igazság manipulálását és a szabadság jelentését vizsgálja.', 1),
(3, 'The Hobbit', 3, 1, 0, 'assets/books/thehobbit.png', 'Egy békés, otthonülő hős váratlan kalandba keveredik, amely során ismeretlen tájakon, furcsa lények között kell helytállnia. A regény humoros, mesés hangvételű, és egy nagyobb fantasy világ kapuját nyitja meg.', 0),
(4, 'Murder on the Orient Express', 4, 3, 1, 'assets/books/murdertheorientexpress.png', 'Egy elegáns vonatút során bűntény történik, és a híres nyomozónak zárt környezetben kell feltárnia az igazságot. A regény a klasszikus krimi mintapéldája, tele éles párbeszédekkel és logikai fordulatokkal.', 1),
(5, 'Düne - A próféta', 5, 3, 1, 'assets/books/duneaprofeta.png', 'A Dűne folytatása egy olyan világba vezet vissza, ahol a hatalom, a vallás és a politika szorosan összefonódik. A történet mélyebb, filozofikusabb hangvételű, és a hősi szerep súlyát, valamint annak következményeit vizsgálja.', 1),
(6, 'A király visszatér', 3, 4, 1, 'assets/books/akiralyvisszater.png', 'Egy hatalmas utazás végső szakasza, ahol a szereplők sorsa és a világ jövője eldől. A regény epikus léptékű, érzelmekkel és csatákkal teli lezárása egy klasszikus fantasy történetnek.', 1),
(7, 'Alapitvány és Föld', 6, 4, 1, 'assets/books/alapitvanyesfold.png', 'Egy hosszú tudományos-fantasztikus sagát lezáró kötet, amely az emberiség eredetét és jövőjét kutatja. A hangsúly a gondolkodáson, a tudáson és a civilizációk közti kapcsolatokon van.', 1),
(8, 'Hyperion', 7, 2, 1, 'assets/books/hyperion.png', 'Egy titokzatos bolygóra tartó utazás története, amely során több szereplő meséli el saját múltját. A regény különleges szerkezetű, filozofikus és irodalmilag gazdag sci-fi, amely nagy kérdéseket tesz fel időről, hitről és emberi sorsról.', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `borrows`
--

CREATE TABLE `borrows` (
  `id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `borrow_start` datetime NOT NULL,
  `borrow_end` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `borrows`
--

INSERT INTO `borrows` (`id`, `book_id`, `user_id`, `borrow_start`, `borrow_end`) VALUES
(1, 2, 1, '2025-11-01 10:00:00', '2025-11-15 10:00:00');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Fantasy'),
(2, 'Science Fiction'),
(3, 'Mystery'),
(4, 'Classics');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `gender` varchar(5) NOT NULL,
  `type` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `gender`, `type`) VALUES
(1, 'Kiss Anna', 'anna.kiss@example.com', '12345Aa', 'F', 'U'),
(2, 'Nagy Péter', 'peter.nagy@example.com', '12345Aa', 'M', 'U'),
(3, 'Tóth Lilla', 'lilla.toth@example.com', '12345Aa', 'F', 'U'),
(4, 'Tóth László Gábor', 'toth.laszlo-2021@keri.mako.hu', '1234Aa', 'M', 'A'),
(5, 'Szalontai László', 'szalontai.laszlo-2021@keri.mako.hu', '1234Aa', 'M', 'A');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`),
  ADD KEY `category_id` (`category_id`);

--
-- A tábla indexei `borrows`
--
ALTER TABLE `borrows`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `borrows`
--
ALTER TABLE `borrows`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`),
  ADD CONSTRAINT `books_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Megkötések a táblához `borrows`
--
ALTER TABLE `borrows`
  ADD CONSTRAINT `borrows_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  ADD CONSTRAINT `borrows_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
