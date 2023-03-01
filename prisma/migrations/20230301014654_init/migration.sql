-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "image" BYTEA,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "layout_day" (
    "id" SERIAL NOT NULL,
    "day" TEXT NOT NULL,
    "opening" TEXT NOT NULL,
    "closing" TEXT NOT NULL,
    "closed" BOOLEAN NOT NULL,

    CONSTRAINT "layout_day_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "custom_oc" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "opening" VARCHAR(5) NOT NULL,
    "closing" VARCHAR(5) NOT NULL,
    "closed" BOOLEAN NOT NULL,

    CONSTRAINT "custom_oc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "custom_closed_time" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "custom_closed_time_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "layout_day_id_key" ON "layout_day"("id");

-- CreateIndex
CREATE UNIQUE INDEX "layout_day_day_key" ON "layout_day"("day");

-- CreateIndex
CREATE UNIQUE INDEX "custom_oc_id_key" ON "custom_oc"("id");

-- CreateIndex
CREATE UNIQUE INDEX "custom_oc_date_key" ON "custom_oc"("date");

-- CreateIndex
CREATE UNIQUE INDEX "custom_closed_time_id_key" ON "custom_closed_time"("id");

-- CreateIndex
CREATE UNIQUE INDEX "custom_closed_time_date_key" ON "custom_closed_time"("date");

-- CreateIndex
CREATE UNIQUE INDEX "appointments_id_key" ON "appointments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "appointments_user_id_key" ON "appointments"("user_id");
