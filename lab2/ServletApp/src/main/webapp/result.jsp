<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="server.data.Result" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Result</title>
</head>
<body>
<h1>Results</h1>
<table border="1" style="text-align: center">
    <tr>
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Time</th>
        <th>Execution Time</th>
        <th>Hit</th>
    </tr>
        <tr>
            <% Result result = (Result) request.getAttribute("result");
                out.println("<td>"+result.x+"</td>");
                out.println("<td>"+result.y+"</td>");
                out.println("<td>"+result.r+"</td>");
                out.println("<td>"+result.time+"</td>");
                out.println("<td>"+result.executionTime+"</td>");
                out.println("<td>"+result.hit+"</td>");
            %>
        </tr>
</table>
<form action="/Lab2-1">
    <input type="submit" value="Return to Previous Page">
</form>
</body>
</html>