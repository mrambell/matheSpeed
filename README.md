# Matheheft 3 und 4

A math learning app for the 3rd and 4th class of German primary school. The whole app is one file, `index.html`. No build step, no server, no accounts, no third-party requests.

## What it does

- **Theory**: every topic has a rule, a worked example and a fresh step-by-step example.
- **Practice**: 19 topics (10 for class 3, 9 for class 4), three difficulty levels each, adapting to the child. A daily mission mixes weak and unseen topics.
- **Speed**: 60-second mental math rounds against the child's own record.
- **Help by exception**: a wrong answer or a tap on "Das weiß ich noch nicht" opens the rule and walks through that exact task step by step, then gives a similar task to retry.
- **Motivation**: points and levels, day streak with a forgiving "Pausen-Joker", surprise sticker after each round, badges (including ones for asking for help and for fixing mistakes).

## Saving

Progress is stored in the browser (`localStorage`) on that device only. Under ⚙ you can save it as a JSON file, or load one, to back up or move to another device.

## Deploy

Any static host works. Pick one.

### GitHub Pages (free, repeatable)

1. Push `index.html` to the `main` branch of this repository.
2. On GitHub: Settings → Pages → Source "Deploy from a branch" → Branch `main`, folder `/ (root)` → Save.
3. After about a minute the app is live at `https://<user>.github.io/<repo>/`.

Every later push to `main` redeploys automatically. On a free GitHub account the repository must be public for Pages.

### Netlify Drop (free, no account setup beyond login)

Open https://app.netlify.com/drop and drag the folder containing `index.html` onto the page. To update, drag it again onto the site's "Deploys" tab.

### Cloudflare Pages (free)

Workers & Pages → Create → Pages → connect this repository. Build command: none. Output directory: `/`.

### No hosting at all

Copy `index.html` to the device and open it in a browser. It works offline.

## Use it like an app

Open the URL on the tablet or phone, then "Add to Home Screen" (Safari share menu, or Chrome's ⋮ menu).

Note: progress belongs to the address the app is opened from. If you change the URL, export the JSON first and import it at the new address.

## Changing content

Nothing is a stored list of tasks: every exercise is generated at random from rules. Sachaufgaben are composed by `story(grade, level)` from parts: add a container to `GRP`, a situation to `POOL` or goods to `SHOP` and new stories appear in every operation type.

Topics live in the `T` array in `index.html`. Each has `rule`, `ex` (example) and `gen(L)`, which returns a task `{t, a, steps}` for level 1 to 3. Speed rounds live in `BL`.
