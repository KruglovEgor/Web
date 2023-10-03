<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Lab2</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="icon" type="image" href="img/favicon.ico">
    <script src="scripts/cleaner.js"></script>
    <script src="scripts/event.js"></script>
    <script src="scripts/history.js"></script>
    <script src="scripts/workingWithLocalStorage/onLoad.js"></script>
    <script src="scripts/pageHistory.js"></script>
    <script src="scripts/workingWithLocalStorage/saveValuesOnUpdate.js"></script>
    <script src="scripts/sender.js"></script>
    <script src="scripts/validator.js"></script>
    <script src="scripts/imgClick.js"></script>
</head>
<body>

<header>Kruglov Egor, P3224 <br> Variant: 3408</header>
<form method="POST">
    <div>
        <div class="parameter-name">x: </div> <br>
        <select id="x-value" id="x-value">
            <option value=-5 name="x-value">-5</option>
            <option value=-4 name="x-value">-4</option>
            <option value=-3 name="x-value">-3</option>
            <option value=-2 name="x-value">-2</option>
            <option value=-1 name="x-value">-1</option>
            <option value=0 name="x-value">0</option>
            <option value=1 name="x-value">1</option>
            <option value=2 name="x-value">2</option>
            <option value=3 name="x-value">3</option>
        </select>
        <div class="error" id="x-error"></div>
    </div>

    <div>
        <div class="parameter-name">y: </div> <br>
        <input type="text" name="y-value" id="y-value" placeholder="(-5; 3)" maxlength="6">
        <div class="error" id="y-error"></div>
    </div>

    <div>
        <div class="parameter-name">R: </div> <br>
        <input type="text" name="r-value" id="r-value" placeholder="(2; 5)" maxlength="6">
        <div class="error" id="r-error"></div>
    </div>
</form>



<img src="img/Lab2.svg" alt="Graphic" id="graphic" width="80%">


<div id="button-container">
    <button id="send-button" class="bottom-button"> Check</button>
    <button id="clear-button" class="bottom-button">Clear</button>
</div>

<div class="error" id="server-error"></div>

<table border="1" cellpadding="0" cellspacing="0" width="100%" id="history">
    <tr>
        <td colspan="5" class="column-name">History</td>
    </tr>
    <tr>
        <td class="column-name">x</td>
        <td class="column-name">y</td>
        <td class="column-name">R</td>
        <td class="column-name">Time</td>
        <td class="column-name">Hit</td>
    </tr>
</table>

<div id="counter-container">
    <span id="current-page" class="page-count">1</span><span id="separator" class="page-count">/</span><span id="last-page" class="page-count">1</span>
</div>
<div id="pagination">
    <button id="prev-button"></button>
    <button id="next-button"></button>
</div>

</body>
</html>