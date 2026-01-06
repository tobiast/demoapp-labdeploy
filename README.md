# demoapp-labdeploy

A simple todo application used for labdeploy testing.

## Architecture

- **Backend**: Kotlin + Spring Boot
- **Database**: PostgreSQL
- **Frontend**: Static HTML + vanilla JavaScript (no framework, no build step)
- **Deployment**: Docker Compose

## Running Locally

### Prerequisites

- Docker
- Docker Compose
- Java 17 (for building)

### Steps

1. Clone the repository
2. Build the application:

```bash
./gradlew build -x test
```

3. Run with Docker Compose:

```bash
docker compose up --build
```

4. Open your browser and navigate to: `http://localhost:8080`

The application will automatically:
- Start a PostgreSQL database
- Build and run the Spring Boot backend
- Serve the static frontend
- Create the database schema

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/{id}` - Update a todo
- `DELETE /api/todos/{id}` - Delete a todo

## Development

To run without Docker:

1. Start PostgreSQL (make sure it's running on port 5432)
2. Run the application:

```bash
./gradlew bootRun
```

3. Open `http://localhost:8080` in your browser
