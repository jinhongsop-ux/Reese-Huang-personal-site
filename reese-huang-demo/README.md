# Reese Huang Personal Digital Space Demo

This is a static high-fidelity demo for **Reese Huang**, designed as a Personal Digital Space rather than a traditional blog, resume, or portfolio.

The site works as a curated public index for thoughts, projects, systems, capabilities, references, and quiet experiments around SEO, AI, independent websites, visual creation, and fictional aesthetics.

## File Structure

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

## Local Preview

Open `index.html` directly in a browser.

No build step, package install, server, external image, or UI library is required.

## WordPress Migration

- Put the homepage HTML from `index.html` into a WordPress page Custom HTML block.
- Put the project archive HTML from `projects.html` into a separate WordPress page Custom HTML block.
- Put `assets/css/style.css` into theme custom CSS, Elementor Custom CSS, or another site-level CSS area.
- Put `assets/js/main.js` into a footer script area or a lightweight script plugin.
- Styles are scoped with `.reese-space` and `.reese-projects` to reduce conflicts with the WordPress theme.

## Expansion Ideas

- Add a Notes page for public thinking fragments.
- Add a Systems page for SEO, AI, prompt, and agent workflows.
- Add a References page for websites, tools, books, essays, characters, and interfaces.
- Connect WordPress blog posts as deeper entries under Thought Index.
- Create individual project detail pages for the Project Archive.
