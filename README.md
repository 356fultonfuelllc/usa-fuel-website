# USA Fuel & Mart website

Single-page site for usafuelandmart.com. Plain HTML, CSS and JavaScript with no build step, so it can be hosted anywhere that serves static files.

## Preview locally

```bash
python3 -m http.server 4321
```

Then open http://localhost:4321.

## Files

- `index.html`: all page text, plus the business details search engines read (the `application/ld+json` block)
- `styles.css`: colors, fonts and layout. Brand colors are at the top (`--navy`, `--red`).
- `script.js`: the live "Open now / Closed" badge, mobile menu and mobile call/directions bar
- `assets/`: logo, icons and the image shown when the link is shared

## Changing hours

Hours appear in `index.html` (hero card, Visit section, footer and the `openingHoursSpecification` block) and in `OPEN` / `CLOSE` at the top of `script.js`. Update all of them together.

## Before launch

- [ ] Real phone number: replace `(555) 555-0100` and `+15555550100` in `index.html`
- [ ] Real offers in the Deals section (the current ones are examples)
- [ ] Confirm the premium octane (the page says 93)
- [ ] Add social media links once the accounts exist
- [ ] Optional: photos of the station and store
