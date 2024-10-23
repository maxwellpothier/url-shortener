# URL Shortener

## Implementation Details

This is a URL shortener application built using Next.js, React and Tailwind CSS. It allows users to input a long URL and receive a shortened version of it.

I utilized Next's app router along with the api directory to handle my api endpoints. There are two endpoints in the application, a POST to shorten the URL (generate a hash and append it to `localhost:3000`), and a GET that dynamically takes in a hash and maps it back to it's stored url.

I built a temporary solution for a database, which is just a class that stores an object. It's all done locally for now in a specific session. Ideally I would use something like MongoDB for a more permanent, scalable solution.

I'm using the `crypto` library for generating the hash. The hash is based on the url, using the alphabet (upper and lower case) and digits. I used a for loop (5 iterations for the length of the hash) that grabs a pseudo random character from the generated hash an adds it to a shortened version.
Each url should have it's own specific hash, which is nice because we only need one entry in the database if the same url is entered more than once.

Unfortunately all the short urls only work locally when the application is running, but it would be fun to deploy to Vercel or Netlify to be able to handle everything on the cloud.

One thing to note: I'm using Next 15 (I think it was released yesterday...) and I ran into a fresh warning you'll see on the server when you hit the GET endpoint "`params` should be awaited before accessing its properties.". I spent like 15 mins trying to figure this out before moving on for time's sake.

## How to Run

To run this application locally, follow these steps:
(Make sure you have Node.js and npm installed on your machine)

1. Clone the repository:

    ```
    git clone git@github.com:maxwellpothier/url-shortener.git
    cd url-shortener
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Start the development server:

    ```
    npm run dev
    ```

4. Open your browser and navigate to `http://localhost:3000`

The application should now be running locally. You can enter a long URL in the input field, click the "Submit" button, and receive a shortened URL in response.

If you click on the shortened URL, a new tab will open, and you'll be quickly redirected to the long url address.

There's also a copy to clipboard button.

For some reason I'm just noticing that the link is a bit finicky when the app first starts up. Not sure why that is, I haven't looked into it quite yet. I'm assuming it has something to do with the warning mentioned in the Implementation Details section.

## Testing

<!-- Describe how you tested your solution (automated testing, manual testing process, screenshots, etc.) -->

I used jest and a little bit of mocking to test this application. Mainly testing the code in the api directory, we've got the helper functions in the POST and mocking the GET covered.

Ideally I would add some end-to-end tests, and maybe even some tests for the React part, to top it off.

These tests are co-located in the api directory, thanks to the app router for making that so convenient.

## Tools Used

I mostly used AI for minor tab completion and a little bit of UI stuff (help with Tailwind). I also used ChatGPT for remembering syntax, specifically in jest and creating the next api routes.

I used some Google for understanding what exactly a URL shortener is.
