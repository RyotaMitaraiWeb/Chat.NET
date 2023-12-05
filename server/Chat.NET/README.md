# Chat.NET server

## Architecture
- **Common** - holds things like validation rules, error messages, and other things that are widely available across the whole project
- **Contracts** - holds interfaces that are implemented by the services
- **Infrastructure** - holds configurations for various aspects of the project, such as authentication and databases.
- **Tests projects** - split into ``Integration`` and ``Unit`` projects. Read below for more information on what tests to write.
- **Web** - holds controllers and acts as the entrypoint for the API
- **Web.Services** - holds services
- **Web.ViewModels** - holds view models and custom validators.

## Testing
The project relies on the following tests:

- **Unit tests** - this is the preferred way to cover a service, controller, or whatever you are creating. Use the below categories only if unit testing is unfeasible, impractical, or does not provide as much value as the following.

- **Integration in-memory tests** - to perform these tests, use the provided ``InMemoryDB`` class and pass its ``Repository`` property to the service. These tests utilize a ``DbContext`` created via EFCore's in-memory provider. Use these tests for more complex interactions where unit testing might not be enough.

- **Integration container tests** - this category spins up Docker containers with the help of the ``Testcontainers`` package and initializes a test server via the ``WebApplicationFactory`` class. You should only write such tests when:
- * testing something which is hard or impossible to unit test
- * you cannot get away with merely using an in-memory database (e.g. you are testing something using ``HttpContext``)
- * the feature or task is very important and you want to make sure that it is fully functional

Feel free to write a container test if the first two conditions hold or if the third condition holds.

The reason for these restrictions is that the container tests take more time to complete and thus slow down the workflows. Unit tests should always be used when possible and the container tests should be used only as a last resort.