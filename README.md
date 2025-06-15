# HTTP Response parser 👓 
A simple web app for parsing and visualizing raw HTTP responses.

Paste an HTTP response into the textarea and view the parsed headers, body, and metadata in a user-friendly format.

https://github.com/keidyz/backlight-kei

## Installation 🚀
Install dependencies: `npm i`

## Running the app
- Run the webapp from your local: `npm run dev`
- Too lazy to run it? Just head over to: `https://keidyz.github.io/backlight-kei/`

## Notable extra libraries 📚
- `radix-ui`: Initially planned to just use styled components and style everything myself but I don't think I have the best tastes so ended up pulling something that is already considered pretty by default
- `react-markdown-preview`: After making the html node parser and displayer by hand, it felt like so much effort for so little ✨--- I felt like this project deserved a live view at that point but instead of making that by hand too, I just grabbed this one instead
- `jest` and `@testing-library/react`: For the tests

## Assumptions 🧐
- I wasn't quite sure about what parsing the assignment was talking about.
- I was thinking it could be JUST the core headers parsing? but maybe more?
- I ended up having fun and made the html node parser too- I would make a lot of changes to it if this were a real product though since the data structure changed quite a bit as I went through finishing the app.
