<?php
// Начинаем сессию или возобновляем ее
session_start();

// Инициализируем массив для хранения результатов в сессии, если он еще не существует
if (!isset($_SESSION['results'])) {
    $_SESSION['results'] = [];
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $x = $_POST["x"];
    $y = $_POST["y"];
    $r = $_POST["r"];

    // Добавьте код для создания SVG изображения и расчета времени выполнения здесь.

    $current_time = date("Y-m-d H:i:s");
    $button_click_time = $current_time; // Время, когда кнопка была нажата
    $response_state = true; // Состояние ответа (всегда true)
    $execution_time = 10; // Время выполнения (всегда 10 секунд)

    // Добавляем результат в массив результатов
    $_SESSION['results'][] = [
        "x" => $x,
        "y" => $y,
        "r" => $r,
        "current_time" => $current_time,
        "button_click_time" => $button_click_time,
        "response_state" => $response_state,
        "execution_time" => $execution_time,
    ];
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP HTML Page</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div style="text-align: center;">
    <div id="intro">Выберите значения X, Y и R:</div>
    <form method="POST" action="">
        <div id="parameters" class="container">
            <label for="x">X:</label>
            <select name="x" id="x">
                <?php
                for ($x = -3; $x <= 5; $x++) {
                    echo "<option value='$x'>$x</option>";
                }
                ?>
            </select>

            <label for="y">Y:</label>
            <select name="y" id="y">
                <?php
                for ($y = -5; $y <= 3; $y++) {
                    echo "<option value='$y'>$y</option>";
                }
                ?>
            </select>

            <label for="r">R:</label>
            <select name="r" id="r">
                <?php
                for ($r = 3; $r <= 5; $r++) {
                    echo "<option value='$r'>$r</option>";
                }
                ?>
            </select>
        </div>
        <button id="send-button" type="submit">Отправить</button>
    </form>
</div>

<!-- Таблица с результатами, выводим только если есть результаты -->
<?php if (!empty($_SESSION['results'])): ?>
    <table align="center" border="1" width="70%">
        <tr>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Текущее время</th>
            <th>Время нажатия кнопки</th>
            <th>Состояние ответа</th>
            <th>Время выполнения</th>
        </tr>
        <?php
        // Выводим результаты из сессии
        foreach ($_SESSION['results'] as $result) {
            echo "<tr>
                    <td>{$result['x']}</td>
                    <td>{$result['y']}</td>
                    <td>{$result['r']}</td>
                    <td>{$result['current_time']}</td>
                    <td>{$result['button_click_time']}</td>
                    <td>" . ($result['response_state'] ? "True" : "False") . "</td>
                    <td>{$result['execution_time']} секунд</td>
                  </tr>";
        }
        ?>
    </table>
<?php endif; ?>

<div style="text-align: center; margin-top: 20px;">
    <button style="background-color: green; padding: 10px 20px; color: white;">Зеленая кнопка</button>
</div>
</body>
</html>