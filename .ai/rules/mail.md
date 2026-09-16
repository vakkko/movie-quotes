---
paths:
  - 'resources/views/mail/**'
---

# Mail

## Markdown mail templates: no 4-space indentation
Laravel markdown mail views (x-mail::message bodies) get parsed by CommonMark. Lines indented 4+ spaces become an indented code block: headings/paragraphs render as plain text and raw HTML (e.g. the <table> verify button) is escaped into a visible <pre><code>. Keep markdown content and HTML-block boundary tags at column 0 (blank lines between blocks). Also: custom header content must go inside <x-mail::header :url="..."> so it renders as a proper <tr><td class="header"> — raw <a>/<img> in x-slot:header breaks the table layout (image left edge, white-on-white text).
