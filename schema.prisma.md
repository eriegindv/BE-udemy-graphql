// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

## run this command `npx prisma init --datasource-provider sqlite`

- This creates a new prisma directory with your Prisma schema file and configures SQLite as your database. You're now ready to model your data and create your database with some tables.

```
generator client {
provider = "prisma-client-js"
}

datasource db {
provider = "sqlite"
url = env("DATABASE_URL")
}

model Post {
id Int @id @map("\_id")
title String
content String
publish Boolean @default(false)
createdAt DateTime @default(now())
updatedAt DateTime
}

model User {
id Int @id @map("\_id")
email String @unique
name String?
password String
createdAt DateTime @default(now())
updatedAt DateTime
}

model Profile {
id Int @id @map("\_id")
bio String
createdAt DateTime @default(now())
updatedAt DateTime
}
```

## run this command `npx prisma migrate dev --name init`

- This command did two things:

1. It creates a new SQL migration file for this migration in the prisma/migrations directory.
2. It runs the SQL migration file against the database.
