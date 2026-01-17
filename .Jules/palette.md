## 2026-01-17 - Missing Focus Indicators
**Learning:** Interactive elements like Buttons and Dropdown toggles lacked `focus-visible` states, making keyboard navigation difficult. Users relying on keyboards would lose context of where they are on the page.
**Action:** Always add `focus-visible:ring-2 focus-visible:ring-offset-2` (or similar) to interactive elements. Ensure the ring color has sufficient contrast against the background.
