# elmasterle

A greek clone of Wordle implemented with SvelteKit with a new word every
24 hours (the word changes at midnight UTC).
I serve the app at [netlify](https://philaris-elmasterle.netlify.app/).


## Developing

Install dependencies with `npm install`. Then, start a development server:
```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

I use the [static adapter](https://kit.svelte.dev/docs#adapters-supported-environments-static-sites)
and I build as follows:
```bash
npm run build
```

> You can preview the built app with `npm run preview`.
