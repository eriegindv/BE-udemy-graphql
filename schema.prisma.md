// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Post {
  id        Int      @id @map("_id")
  title     String
  content   String
  publish   Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime
}

model User {
  id        Int      @id @map("_id")
  email     String   @unique
  name      String?
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime
}

model Profile {
  id        Int      @id @map("_id")
  bio       String
  createdAt DateTime @default(now())
  updatedAt DateTime
}
