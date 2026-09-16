---
paths:
    - 'resources/js/pages/Landing/components/StickyQuotes/**'
---

# Sticky Quotes

## Stacked sticky-card quote reveal on Landing

The Landing home page quote section stacks the quote cards on top of each other and reveals them progressively. The wrapper is `relative` with `height: total * 100vh`; its direct children are sibling `sticky top-0 h-screen` sections (full-bleed background image + overlay + quote text) with inverted z-index (`total - index`) so the first quote sits on top. A scroll listener (rAF + `getBoundingClientRect`) translates each card up by `-index * (100 / total) * progress`, so the top card slides up and gradually reveals the next one beneath it. No animation dependencies, vanilla React + Tailwind.
