# Basic Typescript Template

## Description

Used for small TypeScript apps and scripts.
To use click the green "Use this template" button and create a repository.

## Env

.env files are support as long as `dotenv.config()` is imported and executed.
Example in index.ts.

## Imports

This template supports ES6 imports.
When importing relative files, they must have the `.js` extension in the import statement, even if it is a TypeScript file.

### Example

```typescript
import utility from './utility' // Does not work
import utility from './utility.ts' // Does not work
import utility from './utility.js' // Works
```

## TODO

- Eslint
  - Arrow Functions
  - ES6 Imports
  - Async/Await
  - Object Curly Newline Prettier Conflict
