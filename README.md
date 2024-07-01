# SeaSalon

Welcome to the SeaSalon project! Follow the steps below to get the application up and running on your local environment.

## Prerequisites:

Node.js
npm
MySQL Database

## Getting Started

### 1. Install Dependencies

Run the following command to install all necessary modules:

```bash
npm install
```

### 2. Ensure MySQL Server is Running

SeaSalon uses a MySQL database, so make sure your MySQL server is running before proceeding.

### 3. Run Prisma Migrations

```bash
npx prisma migrate dev --name init
```

This command will create the initial database schema for SeaSalon.

### 4. Update tsconfig.json

Open the `tsconfig.json` file and change the "module": "ESNext" option to "module": "CommonJS"

```json
{
  "compilerOptions": {
    "module": "ESNext"
  }
}
```

to

```json
{
  "compilerOptions": {
    "module": "CommonJS"
  }
}
```

This change is necessary to avoid module resolution errors during the seeding process.

### 5. Seed the Database

```bash
npx ts-node prisma/seed.ts
```

This command runs the TypeScript seed script to populate the database with initial data.

### 6. Revert `tsconfig.json` Change

```json
{
  "compilerOptions": {
    "module": "CommonJS"
  }
}
```

to

```json
{
  "compilerOptions": {
    "module": "ESNext"
  }
}
```

This change restores the module system for the rest of the development process.

### 7. Start the Development Server

```bash
npm run dev
```

This will start the SeaSalon development server.

### 8. Log in as Admin

To add branches and services, log in as the admin with the following credentials:

- ID: `thomas.n@compfest.id`
- Password: `Admin123`

You can now access the admin features to manage branches and services.
