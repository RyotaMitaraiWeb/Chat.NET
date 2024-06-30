# Navigation

The following stylesheets can be used across the project:

- `colors` which provides classes, variables, and mixins for colors (e.g. primary, accent, light/dark mode)
- `effects` which provides classes, variables, and mixins for user actions (e.g. styling for hovering or focusing)
- `font` which provides classes, variables, and mixins for fonts (e.g. classes for big, medium, and small fonts).
- `animations` which provides classes, variables, and mixins for animations. All animations can occur only if the user explicitly allows them (via system settings).
- `util` which hosts useful mixins to ease up some tasks.

The colors and effects also take into account the user's preferences in regards to motion animations and color schema; for example, the exposed primary color changes depending on if the user's system prefers light or dark mode. Likewise, color changes are only animated if the user's system explicitly allows it.

## Useful classes, variables, and mixins

### Colors

When you want to apply a palette color (e.g. primary, secondary) to a component, you can use classes like `.primary`, `.secondary` and similar.
These classes are a combination of the `.background-[palette]` and `.text-on-[palette]` (which applies an appropriate constrast text color) classes which you can also use if you wish to. `text-[palette]` applies a text color of the given palette.

Normally, each palette class defines a contrast text for its color. However, this occassionally does not apply correctly to some elements (e.g. a native `button` tag). You can bypass it like this:

```css
/** Substitute ``primary`` with whatever color you want */
.primary .contrast-text-color
```

Currently, the palette options are primary, secondary, success, warning, info, and error.

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
.accent /* .accent-background + .theme-text */
.accent-emphasis /* .accent-background + .theme-emphasis-text */
.shadow
```

It is preferable to extend the classes rather than use the variables, as those also handle the user's preferences.

### Effects

To apply the effects for a given palette (e.g. primary, secondary, etc.), use a
`.[palette]-effects` class (e.g. `.primary-effects`).

To apply effects for accent containers, use `.accent-hover` and `.accent-click`.

To apply a ripple effect when the user clicks an element, use the `.ripple` class. Note that the effect starts from the center (regardless of where the user clicks) and that the ripple is activated regardless of the user's
animation preferences.

### Font

The following mixins are available:

```scss
@mixin apply-font-sizes();
```
This mixin will apply three classes to the selector upon which the mixin is called for. Those classes are ``size-large``, ``size-medium``, and ``size-small``, with font sizes 18pt, 12pt, and 6pt.

```scss
@mixin apply-font-size($size);
```
Applies a ``font-size`` to the element, corresponding to the provided ``$size``. Valid arguments are ``small``, ``medium``, and ``large``, which are respectively 6pt, 12pt, and 18pt.

### Animations

```scss
@mixin fadeInFromTransparentToSemiTransparent($time: 0.3s);
```

Applying this mixin to a component will cause it to "fade in" from a transparent state to a semi-transparent state. In other words, the component will go from opacity `0` to opacity `0.5` within the passed `$time`.

```scss
@mixin slide-in-from($side, $time: 1s);
```

Smoothly transitions into the specified `$side` (for example, sliding into the left side means that the element will appear on the left side of the screen). The valid values for `$side` are `left`, `right`, `bottom`, and `top`. Note that the element is always positioned at value `0` of the respective side.

```scss
@mixin zoom-in($time: 0.2s);
```

The element transitions from `scale(0)` to `scale(1)`.

### Utility mixins

```scss
@mixin apply-transition($properties-and-times...);
```

Applies a `transition` property with all values provided via ``$properties-and-times` with a media query that checks for no
preference in reduced motion. In other words, this is the same as applying
the transition in a `prefers-reduced-motion` media query manually.

```scss
@mixin apply-values-for-modes($property, $dark-mode-value, $light-mode-value);
```

Applies the `$dark-mode-value` to the passed `$property`. If
the user prefers a light scheme, `$light-mode-value` will be applied instead. In other words, this is the same as defining the dark mode value for the given property and then creating a `prefers-color-scheme` media query for the light mode value.

Note that `$property` is NOT passed as a string (so pass `color` and not `'color'`).
