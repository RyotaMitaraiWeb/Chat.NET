# Navigation
This directory contains reusable components that can be used across various pages and other components. Each folder (except the ones mentioned below) contains the component itself and any other supplementary files (such as stylesheets and types). For more complex components like ``<List>``, it may also contain "subcomponents" that are typically designed to be used with the main component.

Each component also exposes props which match the global HTML attributes (e.g. ``className``, ``id``, ``draggable``, ``style``, among others), all of which are optional and are only applied if explicitly specified (aka they are not ``undefined``).

Each component's root tag has the class name ``component-{kebab-cased-name-of-component}`` which you can use to override styles alongside the ``style`` prop.

The following directories are exceptions to the aforementioned directory structure:

- ``types`` holds types and interfaces that are used in multiple components. For interfaces, those are typically those of "base components" which are meant to be extended by an interface that is implemented by a more specific component (for example, a button component will ideally extend the ``BaseButtonProps``). Regardless of that, all component interfaces implement the ``ElementProps`` interface, which allows the aforementioned passing of global HTML attributes.
- ``internal`` holds base components that are used to develop the reusable ones. Those should not be used in pages or feature implementations.