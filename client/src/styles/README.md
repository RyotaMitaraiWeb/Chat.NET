# Navigation

The following stylesheets can be used across the project:
- ``colors`` which provides classes, variables, and mixins for colors (e.g. primary, accent, light/dark mode)
- ``effects`` which provides classes, variables, and mixins for user actions (e.g. styling for hovering or focusing)
- ``font`` which provides classes, variables, and mixins for fonts (e.g. classes for big, medium, and small fonts).

The colors and effects also take into account the user's preferences in regards to motion animations and color schema; for example, the exposed primary color changes depending on if the user's system prefers light or dark mode. Likewise, color changes are only animated if the user's system explicitly allows it.

## Useful classes, variables, and mixins
### Colors

- ``.primary`` - applies the primary color as a background and an appropriate text color. This is a combination of the ``.background-primary`` and ``.text-on-primary`` classes.

The following SCSS variables (representing the app's color palette) are available:
```scss
$background-dark
$background-light
$accent-light
$accent-dark
$text-emphasis-dark
$text-medium-dark
$text-emphasis-light
$text-medium-light
$shadow
```

These variables can also be included with the following classes:
```css
.theme-background
.accent-background
.theme-text
.theme-emphasis-text
.shadow
```

It is preferable to extend the classes rather than use the variables, as those also handle the user's preferences.

### Effects
The following classes are available:

```css
.primary-hover
.primary-click:active
.accent-hover
.accent-click
```
These classes also apply special styling for disabled elements (whether it be the element itself or its children).

The following SCSS variables are also available for custom implementations:
```scss
$primary-hover-effect;
$primary-click-effect;
```

### Font
The following classes are available:
```css
.size-small
.size-medium
.size-large
```

They are implemented using the following variables:

```scss
$size-small;
$size-medium;
$size-large;
```