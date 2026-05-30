# AGENTS.md

Guidance for AI agents and collaborators working on the Reese Huang personal site.

## Read First

Before changing anything, read these files in order:

1. `PROJECT_LOG.md` - current live WordPress state, page IDs, publishing notes, and recent decisions.
2. `reese-huang-demo/README.md` - static demo structure and WordPress migration notes.
3. `reese-huang-demo/index.html` - homepage source.
4. `reese-huang-demo/assets/css/style.css` - scoped visual system.
5. `reese-huang-demo/assets/js/main.js` - lightweight interactions.

## Project Identity

This is not a normal blog, resume, or portfolio.

The site is a **Personal Digital Space** for Reese Huang:

- thoughts
- projects
- SEO systems
- AI workflows
- independent website experiments
- visual creation
- fictional aesthetics
- reference shelves

The design should feel:

- quiet
- curated
- minimal
- editorial
- soft futuristic
- lightly poetic
- pale purple / pale green / daisy yellow
- Japanese literary in mood
- exploratory without becoming messy

Avoid:

- SaaS landing page patterns
- generic resume sections
- ordinary blog templates
- high-saturation cyberpunk
- anime-heavy fan-site styling
- income claims
- client/company/private details
- PBN or gray-hat SEO language

## Live WordPress State

Current live site:

- Homepage: `https://reesehuang.com/`
- Project archive: `https://reesehuang.com/project-archive/`

Known WordPress pages:

- Homepage page ID: `310`
- Project archive page ID: `311`

The homepage is set as the static front page.

The native GeneratePress header/footer are the visible site-level navigation and footer. They are restyled by the page CSS to match the Reese visual system.

## Editing Model

The static source of truth is the local `reese-huang-demo/` folder.

When changing the live WordPress pages:

1. Edit the local static files first.
2. Validate locally with lightweight checks.
3. Rebuild the WordPress Custom HTML block content from the local files.
4. Publish through the WordPress REST API.
5. Verify the public homepage and project archive.
6. Commit and push changes to GitHub.
7. Update `PROJECT_LOG.md` if behavior, structure, or live state changes.

Do not edit only in WordPress and forget to sync the repository.

## WordPress Block Structure

The WordPress pages are intentionally split into multiple Custom HTML blocks so Reese can rearrange sections later.

Keep these homepage blocks in place:

- `00 styles`
- `01 page wrapper open`
- `98 page wrapper close`
- `99 scripts`

The homepage currently has 15 Custom HTML blocks. It no longer includes custom in-page navigation or a custom site footer; WordPress native header/footer handle those roles.

Keep these project archive blocks in place:

- `00 styles`
- `01 page wrapper open`
- `05 project list open`
- `90 project list close`
- `98 page wrapper close`
- `99 scripts`

Do not move content outside wrapper open/close blocks unless rebuilding the page intentionally.

## CSS Rules

Keep styles scoped.

Primary roots:

- `.reese-space` for homepage
- `.reese-projects` for project archive
- `.rh-gallery-section` for the capability gallery module

Global CSS should be avoided except for the existing minimal body reset and WordPress page takeover rules inside the WordPress custom block.

Use:

- CSS variables for color systems
- `clamp()` for responsive typography
- soft borders
- restrained shadows
- low-saturation colors
- `prefers-reduced-motion`

Avoid:

- external libraries
- external images
- Tailwind / Bootstrap / React / Vue
- aggressive animations
- hard black borders
- bright saturated palettes
- nested card-on-card compositions

## Animation Skill Policy

The machine has the official GreenSock `gsap-skills` Claude plugin installed. Use it only when the user explicitly asks for advanced frontend animation guidance. For the Reese Huang site, prefer lightweight CSS animation and vanilla JavaScript first.

Do not add GSAP, ScrollTrigger, CDN scripts, smooth-scroll libraries, or scroll-jacking behavior to the WordPress pages unless the user explicitly approves that dependency and the visual direction. The site should remain quiet, fast, and easy to migrate through Custom HTML blocks.

## Current Homepage Notes

The capability gallery is a pure visual marquee:

- CSS animation: `rh-gallery-marquee`
- track class: `is-auto-loop`
- JS sets `--rh-loop-distance`
- real horizontal scrolling is hidden
- users cannot drag to a finite end
- tile index numbers are hidden
- mobile uses a static responsive grid, not cloned autoplay

The reveal system is intentionally safe:

- content is visible by default
- `is-reveal-ready` only adds motion
- `safeInit` prevents one JS issue from blanking the page

## Testing Checklist

Run before publishing:

```bash
node --check reese-huang-demo/assets/js/main.js
git status -sb
```

After publishing, verify:

- `https://reesehuang.com/` returns 200
- homepage contains `.reese-space`
- homepage contains `.rh-gallery-section`
- homepage contains `rh-gallery-marquee`
- homepage does not contain `.rs-nav` or `.rs-site-footer`
- WordPress native primary menu is `Index / Projects / Systems / Notes / References / About`
- project archive contains `.reese-projects`
- Chinese text is not garbled
- LiteSpeed cache is serving the updated content

## Security

Never commit secrets.

Do not store:

- WordPress username
- WordPress Application Password
- API keys
- session tokens
- private credentials

If credentials were pasted in chat or used during a session, remind Reese to revoke and regenerate them.

## GitHub Workflow

Repository:

`https://github.com/jinhongsop-ux/Reese-Huang-personal-site`

Main branch:

`main`

Commit style:

- concise
- behavior-focused
- explain what changed, not implementation trivia

Examples:

- `Sync Reese Huang static demo files`
- `Use CSS marquee for gallery autoplay`
- `Polish homepage frames and footer`

After any live WordPress change, commit the matching local file changes and update `PROJECT_LOG.md`.

## If You Are Unsure

Do not guess around live WordPress structure.

Instead:

1. Fetch the live page HTML.
2. Compare it with local source.
3. Preserve the module split.
4. Make the smallest safe change.
5. Verify publicly.

The design target is calm, curated, and alive. Keep the site expressive, but never noisy.
