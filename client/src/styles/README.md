# Navigation

The following stylesheets can be used across the project:
- ``colors`` which provides classes, variables, and mixins for colors (e.g. primary, accent, light/dark mode)
- ``effects`` which provides classes, variables, and mixins for user actions (e.g. styling for hovering or focusing)
- ``font`` which provides classes, variables, and mixins for fonts (e.g. classes for big, medium, and small fonts).
- ``animations`` which provides classes, variables, and mixins for animations. All animations can occur only if the user explicitly allows them (via system settings).

The colors and effects also take into account the user's preferences in regards to motion animations and color schema; for example, the exposed primary color changes depending on if the user's system prefers light or dark mode. Likewise, color changes are only animated if the user's system explicitly allows it.

## Useful classes, variables, and mixins
### Colors

When you want to apply a palette color (e.g. primary, secondary) to a component, you can use classes like ``.primary``, ``.secondary`` and similar.
These classes are a combination of the ``.background-[palette]`` and ``.text-on-[palette]`` classes which you can also use if you wish to.

The following SCSS variables (representing the app's theming) are available:
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
To apply the effects for a given palette (e.g. primary, secondary, etc.), use a
``.[palette]-effects`` class (e.g. ``.primary-effects``).

To apply effects for accent containers, use ``.accent-hover`` and ``.accent-click``.


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

### Animations
```scss
@mixin fadeInFromTransparentToSemiTransparent($time: 0.3s)
```
Applying this mixin to a component will cause it to "fade in" from a transparent state to a semi-transparent state. In other words, the component will go from opacity ``0`` to opacity ``0.5`` within the passed ``$time``.