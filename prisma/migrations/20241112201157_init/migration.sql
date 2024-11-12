-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR NOT NULL,
    "createdat" TIMESTAMP(6),

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);
