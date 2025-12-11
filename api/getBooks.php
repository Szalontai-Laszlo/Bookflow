<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$host = '127.0.0.1';
$db   = 'bookflow';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);

    // Léteznek-e a szükséges oszlopok / tábla mezők?
    $stmt = $pdo->prepare("
        SELECT COUNT(*) 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'books' AND COLUMN_NAME = 'img'
    ");
    $stmt->execute([$db]);
    $hasImg = (int)$stmt->fetchColumn() > 0;

    $stmt = $pdo->prepare("
        SELECT COUNT(*) 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'authors' AND COLUMN_NAME = 'name'
    ");
    $stmt->execute([$db]);
    $hasAuthorName = (int)$stmt->fetchColumn() > 0;

    // Összeállítjuk a SELECT részt dinamikusan
    $select = ["b.id", "b.title"];
    if ($hasAuthorName) {
        $select[] = "a.name AS author";
    } else {
        $select[] = "b.author_id AS author_id";
    }
    if ($hasImg) {
        $select[] = "b.img";
    } else {
        $select[] = "'' AS img";
    }
    $select[] = "b.status";

    $join = $hasAuthorName ? "LEFT JOIN authors a ON b.author_id = a.id" : "";

    $sql = "SELECT " . implode(", ", $select) . " FROM books b $join ORDER BY b.id";
    $stmt = $pdo->query($sql);
    $rows = $stmt->fetchAll();

    // Normalizáljuk az img mezőt (ha csak fájlnév van, előtesszük az assets könyvtárat)
    foreach ($rows as &$r) {
        $img = isset($r['img']) ? trim($r['img']) : '';
        if ($img === '') {
            $r['img'] = 'assets/books/default.png'; // default kép, helyettesíthető
        } elseif (strpos($img, 'assets/') === false && !preg_match('#^https?://#i', $img)) {
            $r['img'] = 'assets/books/' . $img;
        }
        // Ha nincs author mező, próbáljuk konvertálni author_id -> szerzőnév nem elérhető API-ból
        if (!isset($r['author']) && isset($r['author_id'])) {
            $r['author'] = 'Szerző #' . $r['author_id'];
        }
    }
    unset($r);

    echo json_encode($rows);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
};