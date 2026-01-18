## 2025-05-21 - Button Accessibility
**Learning:** Common pattern of using `<a>` tags as buttons often leads to missing "button-like" states (hover, focus, active). Default browser focus rings on links might not be sufficient or consistent with the design system.
**Action:** When creating button-like links, explicitly add `focus-visible` ring styles and hover/transition effects to match actual `<button>` behavior and ensure keyboard accessibility.
