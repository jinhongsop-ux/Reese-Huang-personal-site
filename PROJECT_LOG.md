# Reese Huang Personal Digital Space - Project Log

Last updated: 2026-05-29

## Purpose

This file is the shared project memory for Reese Huang's personal website work. It is written for future collaborators, including other AI agents, so they can understand the current state without rereading the full conversation.

## Current Outcome

- Built a static high-fidelity demo for **Reese Huang / Personal Digital Space**.
- Published the demo to WordPress at `https://reesehuang.com/`.
- Published the project archive page at `https://reesehuang.com/project-archive/`.
- Set the Reese Huang page as the WordPress static homepage.
- Converted WordPress page content into multiple Custom HTML blocks so each section can be moved or edited independently in the page editor.
- Added page-level CSS to visually hide the original GeneratePress header/footer and make the demo full width.

## Local Files

The local static demo lives in:

```text
reese-huang-demo/
  index.html
  projects.html
  assets/
    css/
      style.css
    js/
      main.js
  README.md
```

The important files are:

- `reese-huang-demo/index.html` - static homepage source.
- `reese-huang-demo/projects.html` - static project archive source.
- `reese-huang-demo/assets/css/style.css` - scoped demo CSS.
- `reese-huang-demo/assets/js/main.js` - lightweight interactions.
- `reese-huang-demo/README.md` - migration and usage notes.

## WordPress State

Published pages:

- Homepage page ID: `310`
- Homepage slug: `reese-huang`
- Homepage public URL: `https://reesehuang.com/`
- Project archive page ID: `311`
- Project archive slug: `project-archive`
- Project archive public URL: `https://reesehuang.com/project-archive/`

WordPress setting:

- `show_on_front = page`
- `page_on_front = 310`

The homepage content is split into 16 Custom HTML blocks. The project archive content is split into 17 Custom HTML blocks.

Each block includes a comment label such as:

```html
<!-- Reese module: 02 navigation -->
```

These labels are intentionally included to help humans and AI agents identify sections in the WordPress editor.

## WordPress Editing Rules

Keep these blocks in place:

- `00 styles`
- `01 page wrapper open`
- `98 page wrapper close`
- `99 scripts`

On the project archive page, also keep these blocks in place:

- `05 project list open`
- `90 project list close`

Do not move content outside the page wrapper blocks unless rebuilding the full page structure.

The page-level CSS currently hides the theme header/footer and removes GeneratePress container width limits for page IDs `310`, `311`, and `body.home`.

## Design Direction

The site is not intended to feel like a blog, resume, or traditional portfolio. It should feel like:

- Personal Digital Space
- curated index wall
- quiet technology
- soft futuristic personal archive
- pale purple and pale green aesthetic
- light Japanese literary feeling
- restrained fictional-persona atmosphere

Avoid:

- company/client details
- income claims
- PBN or gray-hat SEO language
- overly private life details
- high-saturation cyberpunk or anime-heavy styling

## Implementation Notes

- No React, Vue, Tailwind, Bootstrap, external images, or external UI libraries.
- CSS is scoped under `.reese-space` and `.reese-projects`, with only a minimal `body { margin: 0; }` reset.
- Visual media is generated with CSS and HTML elements.
- `prefers-reduced-motion` is supported.
- JavaScript handles:
  - smooth anchor scrolling
  - mobile nav toggle
  - scroll reveal
  - project filtering
  - light pointer-depth effect on project cards

## Verification Already Performed

- `node --check reese-huang-demo/assets/js/main.js` passed.
- Public homepage contains `.reese-space`.
- Public project archive contains `.reese-projects`.
- Chinese text renders correctly after UTF-8 re-upload.
- Homepage is set as the root site page.
- Project filters exist in the published page markup.
- Theme header/footer markup still exists in the generated HTML but is visually hidden by page-level CSS.

## Security Notes

WordPress API credentials were used during setup but must not be stored in this repository or repeated in project files.

The previously used WordPress Application Password should be revoked and regenerated in the WordPress admin for safety.

## Suggested Next Work

- Add standalone Notes, Systems, and References pages.
- Replace placeholder `mailto:hello@reesehuang.com` if needed.
- Add project detail pages under the project archive.
- Add screenshots or Playwright visual checks for desktop and mobile.
- Consider moving CSS/JS into theme-level assets once the design stabilizes.
- Configure a GitHub remote and push this local repository.

## Agent Handoff Checklist

Before editing:

1. Check `git status --short`.
2. Read this file and `reese-huang-demo/README.md`.
3. If changing WordPress, fetch the live page first and preserve the modular block structure.
4. Do not store credentials in files.
5. Keep CSS scoped to `.reese-space` or `.reese-projects`.
6. Verify the public root URL and project archive after publishing.
