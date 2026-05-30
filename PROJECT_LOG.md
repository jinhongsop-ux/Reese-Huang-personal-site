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
- Replaced the homepage text-only Index Wall with a scrollable mixed-size visual capability gallery using `.rh-gallery-section`.
- Optimized the gallery into an auto-scrolling infinite loop that pauses on hover, focus, or pointer hold.
- Repaired homepage display safety by making reveal content visible by default and isolating JS init failures with `safeInit`.
- Strengthened the gallery autoplay with virtual scroll accumulation, faster visible motion, and mobile-only static grid behavior without cloned tiles.
- Rebuilt gallery autoplay as a CSS transform marquee (`rh-gallery-marquee`) with JS only setting the loop distance and clone set.
- Removed the gallery's real horizontal scrollbar so the loop behaves as a pure visual marquee, and hid the tile index numbers.
- Added a custom homepage footer and changed the homepage nav to fixed positioning so it remains usable while scrolling.
- Cleaned the homepage section/card frame system with consistent soft borders, panel backgrounds, and less noisy internal divider lines.
- Restored the live WordPress homepage and project archive after an external edit broke styling/module structure; both pages were republished as 17 Custom HTML blocks.
- Removed the homepage gallery's extra scroll-hint decorations and reinforced WordPress full-width container overrides.
- Installed the official GreenSock `gsap-skills` Claude plugin for optional animation guidance; Reese site policy remains CSS/vanilla JS first unless GSAP is explicitly approved.
- Upgraded the homepage toward a more image-and-text editorial gallery feel: hero gained a coded avatar/index cover, project cards gained generated visual covers, and the Visual System expanded from 3 to 6 coded media cards.
- Switched the live site back to native WordPress/GeneratePress header and footer containers, restyled them to match the Reese visual system, replaced the primary menu with `Index / Projects / Systems / Notes / References / About`, and removed the custom in-page nav/footer modules.
- Cleared the legacy GeneratePress footer widget areas `footer-1`, `footer-2`, and `footer-3` in WordPress so the old “Reese Explores China” widget footer no longer renders above the native Reese footer.
- Restored the site after the homepage was accidentally deleted by recreating the homepage as page ID `396`, recreating the project archive as page ID `397`, and setting `page_on_front = 396`.
- Migrated the full visual dashboard Hero from page `382-2` into the live homepage Hero, adjusted internal links to current anchors/project archive URLs, replaced the image placeholder with a transparent inline SVG, and started aligning downstream homepage modules with the same dashboard/archive visual language.
- Removed the duplicated navigation bar from inside the dashboard Hero and restyled the native WordPress/GeneratePress header to inherit the Hero navigation language: `RH` mark, subtle Personal Digital Space label, fine link typography, and pale purple active underline.
- Converted the homepage page ID `396` from Custom HTML blocks into Elementor data: 13 top-level Elementor Containers, one module per container, each containing one HTML widget. The homepage `post_content` is now intentionally empty because Elementor renders from `_elementor_data`.

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

- Homepage page ID: `396`
- Homepage slug: `home-2` (served as the static root homepage)
- Homepage public URL: `https://reesehuang.com/`
- Project archive page ID: `397`
- Project archive slug: `project-archive`
- Project archive public URL: `https://reesehuang.com/project-archive/`

WordPress setting:

- `show_on_front = page`
- `page_on_front = 396`

The homepage content is managed by Elementor and split into 13 top-level Containers. The project archive content is still split into 8 Custom HTML blocks.

Each homepage Elementor container has a title such as `02 hero visual dashboard` or `03 capability gallery`. Project archive blocks include comment labels such as:

```html
<!-- Reese module: 02 hero -->
```

These labels are intentionally included to help humans and AI agents identify sections in the editor.

## WordPress Editing Rules

For the homepage, keep the Elementor top-level container model:

- `00 styles`
- `02 hero visual dashboard`
- `03 capability gallery`
- `04 digital identity`
- `05 current focus`
- `06 project directory`
- `07 thought index`
- `08 capability index`
- `09 visual system`
- `10 reference shelf`
- `11 public log`
- `12 about`
- `99 scripts`

Do not collapse the homepage back into one Elementor text editor or one Custom HTML block.

Do not move content outside the page wrapper blocks unless rebuilding the full page structure.

The page-level CSS currently keeps the native GeneratePress header/footer visible, restyles them for the Reese visual system, and removes GeneratePress container width limits for page IDs `396`, `397`, legacy IDs `310`, `311`, and `body.home`.

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
  - auto-scrolling infinite capability gallery with hover/focus/hold pause
  - guarded module initialization so one JS error cannot blank the page
  - mobile breakpoint behavior that disables gallery cloning/autoplay and uses a compact readable grid
- CSS-based gallery marquee that pauses on focus or pointer hold, but not on passive hover
- hidden overflow/scrollbars for the gallery viewport so users cannot drag to a finite end
- fixed homepage navigation, custom footer, and unified frame styling for secondary homepage modules

## Verification Already Performed

- `node --check reese-huang-demo/assets/js/main.js` passed.
- Public homepage contains `.reese-space`.
- Public project archive contains `.reese-projects`.
- Chinese text renders correctly after UTF-8 re-upload.
- Homepage is set as the root site page.
- Project filters exist in the published page markup.
- Theme header/footer markup is now the visible site navigation/footer layer and is styled by page-level CSS.
- Footer widget areas `footer-1`, `footer-2`, and `footer-3` are intentionally empty. Do not repopulate them with the old travel-site footer.
- Public homepage contains the new `.rh-gallery-section` visual index and `data-rh-gallery` scroll behavior.
- Public homepage contains the optimized gallery loop code using `requestAnimationFrame`, cloned gallery items, and pointer/focus pause events.
- Public homepage contains reveal-safe CSS where `[data-reveal]` remains visible even if JavaScript fails.
- Public homepage contains the updated gallery speed, virtual scroll state, and mobile clone-hiding CSS.
- Public homepage no longer uses the old `scrollLeft` autoplay loop; it uses `is-auto-loop` and `--rh-loop-distance`.
- Public homepage hides `.rh-tile-index` and uses `overflow-x: hidden` plus hidden scrollbar rules for the gallery viewport.
- Public homepage no longer includes custom `.rs-nav` or `.rs-site-footer`; navigation and footer are handled by native WordPress/GeneratePress markup.

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
