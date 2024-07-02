# SeaSalon

Welcome to the SeaSalon project! This project is build using Next.js and Prisma. Follow the steps below to get the application up and running on your local environment.

## Prerequisites:

### Node.js

### NPM

### MySQL Database

## Getting Started

### 1. Install Dependencies

Run the following command to install all necessary modules:

```bash
npm install
```

### 2. Ensure MySQL Server is Running

SeaSalon uses a MySQL database, so make sure your MySQL server is running before proceeding.

### 3. Update tsconfig.json

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

### 4. Run Prisma Migrations

```bash
npx prisma migrate dev --name init
```

This command will create the initial database schema for SeaSalon.

### 5. Start the Development Server

```bash
npm run dev
```

This will start the SeaSalon development server.

### 6. Log in as Admin

To add branches and services, log in as the admin with the following credentials:

- ID: `thomas.n@compfest.id`
- Password: `Admin123`

You can now access the admin features to manage branches and services.

### 7. Log in as User

To access the user dashboard, you need to first register as a user and then log in. Once logged in, you can access the user dashboard where you can:

- Create a New Reservation : Schedule your appointments by selecting the desired service, branch, date, and time.
- View Reservation History : Check your past reservations to keep track of your appointments and services availed.
