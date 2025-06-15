const mockHttpResponses = [
    `
HTTP/1.1 418 I'm a teapot
Content-Type: text/plain; charset=UTF-8
Date: Wed, 01 Jan 2025 00:00:00 GMT
Content-Length: 29

I'm a teapot, not a coffee machine!
    `,
    `
HTTP/1.1 418 I'm a teapot
Content-Type: text/html; charset=UTF-8
Date: Wed, 01 Jun 2025 01:00:00 GMT
Content-Length: 1231121

<!DOCTYPE html>
<html>
<head>
<title>I'm a teapot</title>
</head>
<body>
<h1>418 I'm a teapot</h1>
<p>This is a teapot, not a coffee machine!</p>
</body>
</html>
    `,
    `
HTTP/1.1 403 Forbidden
Content-Type: text/html; charset=UTF-8
Date: Wed, 01 Jan 2025 00:00:00 GMT
Content-Length: 99

<!DOCTYPE html>
<html>
<head>
<title>Blocked</title>
</head>
<body>
<h1>Access Denied</h1>
<p>This page is blocked by Windows Parental Controls. 👀</p>
</body>
</html>
    `,
    `
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Date: Wed, 01 Jun 2025 00:00:00 GMT
Content-Length: 1234

<!DOCTYPE html>
<html>
<head>
<title>Mock Response</title>
</head>
<body>
<h1>Welcome to the Mock Response</h1>
<a href="https://github.com/keidyz/backlight-kei">Link</a>
<p>This is a sample response body.</p>
</body>
</html>
    `,
    `
HTTP/1.1 404 Not Found
Content-Type: text/html; charset=UTF-8
Date: Wed, 15 Jun 2025 00:00:00 GMT
Content-Length: 567

<!DOCTYPE html>
<html>
<head>
<title>Page Not Found</title>
</head>
<body>
<h1>404 Error</h1>
<table>
<tr>
<th>URL</th>
<th>https://github.com/keidyz/ugabuga</th>
</tr>
</table>
</body>
</html>
    `,
    `
HTTP/1.1 500 Internal Server Error
Content-Type: text/html; charset=UTF-8
Date: Wed, 01 Jan 2025 00:00:00 GMT
Content-Length: 890

<!DOCTYPE html>
<html>
<head>
<title>Server Error</title>
</head>
<body>
<h1>500 Error</h1>
<p>Something went wrong on our end. Please try again later.</p>
</body>
</html>
    `,
    `
HTTP/1.1 301 Moved Permanently
Location: https://www.example.com/new-location
Content-Type: text/html; charset=UTF-8
Date: Wed, 01 Jan 2025 00:00:00 GMT
Content-Length: 234

<!DOCTYPE html>
<html>
<head>
<title>Redirect</title>
</head>
<body>
<h1> Redirecting...</h1>
<h2>You are being redirected to a new location.</h2>
<p>If you are not redirected automatically, follow this <a href="https://github.com/keidyz/backlight-kei">link</a>.</p>
<p>Thank you for your patience.</p>
</body>
</html>
    `,
    `
HTTP/1.1 200 OK
Content-Type: application/json; charset=UTF-8
Date: Wed, 01 Jan 2025 00:00:00 GMT
Content-Length: 56

{
"message": "This is a mock JSON response",
"status": "success"
}
    `,
]

export const getRandomMockHttpResponse = () => {
    const randomIndex = Math.floor(Math.random() * mockHttpResponses.length)
    return mockHttpResponses[randomIndex].trim()
}
