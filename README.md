# Chat.NET

## Navigation

- the ``client`` directory hosts the client project, written in NextJS + TypeScript
- the ``server/Chat.NET`` directory hosts the server project, written in .NET Core 8.

## Running the project
The easiest way to run the project is via the provided ``docker-compose.dev`` file. All you have to do is create an ``.env`` file in the root of the entire project (same directory as the aforementioned Docker Compose file) and fill it with the needed environment variables. You can copy and paste the content from the provided ``sample.env`` if you simply want to spin up a working demo of the project.

Once you are done, simply build the Docker Compose file and wait for all services to be ready (this may take a few minutes so please be patient!). The client project can be accessed on http://localhost:3000

## License
MIT