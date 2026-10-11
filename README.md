# Happy Birthday, Dad! ♡

A personal birthday page from Vignesh, with the complete birthday letter, all 16 family photographs, a full-screen photo album, and a little confetti celebration.

## Preview

Open `index.html` in a browser. Everything, including the fonts, is included locally. There is no installation or build step.

For a local server, run `python -m http.server 4173` in this folder, then visit http://localhost:4173.

## Publish on GitHub Pages

1. Sign in to **vigneshnara88** on GitHub and create a public repository named **happy-birthday-dad**.
2. Upload `index.html`, `styles.css`, `script.js`, all 16 `.jpg` photographs, and the complete `assets` folder to the repository's root. Include `.nojekyll` if using Git. If using the ZIP, extract it first and upload the contents, not the ZIP itself. Do not upload `.qa` or `node_modules`.
3. Open the repository's **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, then **main** and **/ (root)**. Click **Save**.
4. GitHub will display the published link when deployment completes. With the repository name above, it will be:

   **https://vigneshnara88.github.io/happy-birthday-dad/**

This is the expected address after publication, not a confirmation that the site is already live. GitHub Pages publishes the photos and letter as a public website. The page requests that search engines not index it; that setting is not access control.

Official instructions: [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) and [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Personalise it

- The letter, headings and signature are in `index.html`. The supplied letter is preserved verbatim, including its original spelling.
- Colours, spacing, typography and phone layouts are in `styles.css`.
- Album captions and photo order are in `script.js`.
- Keep the original photo filenames unless you update their references in both HTML and JavaScript.
- All paths are relative, so the page also works if you use a different repository name.

The album supports arrow keys, Escape, touch swipes and thumbnails. The birthday animation respects reduced-motion preferences. Printing the page produces just the letter.

## Fonts

Cormorant Garamond, DM Sans and Caveat are hosted locally under the SIL Open Font License. Their license files are included in `assets/fonts`.
