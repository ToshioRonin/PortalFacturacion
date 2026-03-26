-- CreateTable
CREATE TABLE "Factura" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productos" JSONB NOT NULL,
    "subtotal" REAL NOT NULL,
    "iva" REAL NOT NULL,
    "total" REAL NOT NULL
);
