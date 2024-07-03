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

Currently, the palette options are primary, secondary, success, warning, info, and error.

```scss
@mixin apply-palette-backgrounds();
@mixin apply-palette-text($interactive: false);
@mixin apply-palette-outlined-text($interactive: false, $outlined: true);
```
These mixins apply styling to elements with the following classes, in order:
- ``background-{palette}``
- ``text-{palette}``
- ``outlined-{palette}``
where ``{palette}`` is each palette color.

The background class will apply the palette color as a background color with an appropriate contrast text. The text class applies the palette as a text color. The outlined class applies the palette as a text and border color (by default, the border has a width of 1px).

For the text and outlined variants, you can also mark them as interactive, which applies a ripple of the respective colors.

The ``$outlined`` parameter is used in components like chips that are already wrapped up in outlined containers, but still desire some of the effects provided by the mixin.

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

These variables are used in the following mixins:
```scss
@mixin apply-theme-background();
@mixin apply-accent-background();
@mixin apply-theme-text();
@mixin apply-theme-emphasis-text();
@mixin shadow();
```

It is preferable to use the mixins, as they handle user preferences and stuff like disabled status out-of-the-box for you.

### Effects
```scss
@mixin apply-palette-effects();
```
Applies styling for elements with classes in the format ``.{palette}-effects`` (e.g. ``.primary-effects``). These styles handle an element's hover, active, focused, and disabled states with colors appropriate for the palette.

```scss
@mixin apply-accent-hover();
@mixin apply-accent-click();
```
These mixins provide styling for elements' hover and active states, using the app's accent colors.

```scss
@mixin ripple($ripple-color-light: black, $ripple-color-dark: white)
```

Applies a ripple effect that triggers when the element is clicked. Note that the effect starts from the center (regardless of where the user clicks) and that the ripple is activated regardless of the user's animation preferences.

By default, the ripple color is black or white, depending on the current theme. You can configure the colors for both themes via parameters.

```scss
@mixin apply-outlined-ripple();
```
Applies a ripple of appropriate colors for all elements with class name ``outlined-{palette}``.

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
