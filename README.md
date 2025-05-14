# Stonks api

Backend for the stonks an unofficial api for stock data and news

## Features

- **Fastify**: Modern, fast web framework for Node.js
- **TypeScript**: Type-safe code with tsx for running TS directly
- **API Documentation**: Auto-generated Swagger documentation
- **Health Check**: Built-in health check endpoint
- **Code Quality**:
  - Biome for linting and formatting
  - Lefthook for Git hooks
  - Commitlint for consistent commit messages
- **Release Management**: Using release-it with conventional changelog

## Prerequisites

- Node.js (v16+)
- npm (v8+)

## Project Structure

```
stonk_api/
├── src/               # Source code
│   ├── config/        # Configuration files
│   ├── controllers/   # Request handlers
│   ├── middleware/    # Express middleware
│   ├── models/        # Data models
│   ├── plugins/       # Fastify plugins
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   ├── utils/         # Utility functions
│   ├── index.ts       # Application entry point
│   └── server.ts      # Server configuration
├── biome.json         # Biome configuration
├── commitlint.config.js # Commitlint configuration
├── lefthook.yml       # Git hooks configuration
├── package.json       # Project dependencies
└── tsconfig.json      # TypeScript configuration
```

## Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd stonk_api

# Install dependencies
npm install

# Initialize git hooks
npm run prepare
```

### Development

```bash
# Start development server with hot reload
npm run dev

# Check for linting issues
npm run lint

# Format code
npm run format
```

### Building for Production

```bash
# Build the project
npm run build

# Start the production server
npm start
```

## API Documentation

Once the server is running, you can access the Swagger documentation at:

```
http://localhost:3000/documentation
```

## Health Check

The API includes a health check endpoint at:

```
GET /api/health
```

Example response:
```json
{
  "status": "ok",
  "timestamp": "2025-05-14T12:00:00.000Z",
  "version": "1.0.0",
  "uptime": 123.45
}
```

## Git Workflow

This project uses conventional commits and enforces them with commitlint.
Common prefixes include:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `chore:` for maintenance tasks
- `refactor:` for code refactoring
- `test:` for adding or modifying tests

Example:
```bash
git commit -m "feat: implement user authentication"
```

## Releasing

To create a new release:

```bash
npm run release
```

This will:
1. Bump version according to semantic versioning
2. Update CHANGELOG.md
3. Create a Git tag
4. Push changes to the repository

## License

[MIT](LICENSE)