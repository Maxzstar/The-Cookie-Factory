# The Cookie Factory

Static GitHub Pages site for the Unreal Engine game.

## Add the game build

1. Put the packaged build file in `builds/`.
2. Open `script.js`.
3. Set `build.file`, `build.version`, and `build.size`.

Example:

```js
const build = {
  file: "builds/TheCookieFactory-Windows.zip",
  version: "0.1.0",
  size: "850 MB",
};
```

GitHub Pages can publish this repository from the main branch with `/` as the site folder.

## Send patch notes

Open `owner.html` in the published site or local preview.

1. Write the version, date, title, summary, and changes.
2. Press `Prepare note`.
3. Press `Copy website update`.
4. Replace the contents of `data/patch-notes.js` with the copied text.
5. Publish the site again.

GitHub Pages is static, so the owner page prepares the patch note update instead
of saving to the server by itself.
