# 📦 Portal de Facturación

Este proyecto es un portal de facturación desarrollado con **Next.js + Prisma + SQLite**, utilizando una arquitectura monolítica (frontend + backend en un solo proyecto).

---

## 🚀 Requisitos

Antes de comenzar, asegúrate de tener instalado:

* Node.js (v18 o superior recomendado)
* npm

---

## 🛠 Instalación del proyecto

Clona el repositorio o descarga el proyecto, luego ejecuta:

```bash
npm install
```

---

## ⚙️ Configuración de variables de entorno

Crea un archivo `.env` en la raíz del proyecto (si no existe) y agrega lo siguiente:

```env
DATABASE_URL="file:./prisma/dev.db"
```

---

## 🗄 Configuración de la base de datos (Prisma)

Este paso es **OBLIGATORIO**, ya que la base de datos no se incluye automáticamente.

### 1. Generar cliente de Prisma

```bash
npx prisma generate
```

### 2. Ejecutar migraciones

```bash
npx prisma migrate dev
```

Esto realizará lo siguiente:

* Creará la base de datos `dev.db`
* Creará la tabla `Factura`
* Aplicará las migraciones existentes

---

## ▶️ Ejecutar el proyecto

```bash
npm run dev
```

Abrir en el navegador:

```
http://localhost:3000
```

---

## 🧪 Probar la API

Base URL:

```
http://localhost:3000/api/facturas
```

### 📌 Endpoints disponibles

| Método | Endpoint          | Descripción                |
| ------ | ----------------- | -------------------------- |
| GET    | /api/facturas     | Obtener todas las facturas |
| POST   | /api/facturas     | Crear una factura          |
| PUT    | /api/facturas/:id | Actualizar factura         |
| DELETE | /api/facturas/:id | Eliminar factura           |

---

## 📥 Ejemplo de body (POST / PUT)

```json
{
  "clienteId": 1,
  "productos": [
    {
      "productoId": 1,
      "cantidad": 2,
      "precio": 15000
    },
    {
      "productoId": 2,
      "cantidad": 1,
      "precio": 300
    }
  ]
}
```

> ⚠️ El campo `total` se calcula automáticamente en el backend.

---

## 🔍 Ver base de datos (opcional)

Puedes visualizar la base de datos con:

```bash
npx prisma studio
```

Se abrirá en:

```
http://localhost:5555
```

---

## ⚠️ Problemas comunes

### ❌ Error: `The table 'Factura' does not exist`

Solución:

```bash
npx prisma migrate dev
```

---

### ❌ Se crea otra base de datos en la raíz

Verifica que tu `.env` tenga:

```env
DATABASE_URL="file:./prisma/dev.db"
```

---

## 🧠 Notas

* Los **clientes y productos** se manejan en memoria (arrays).
* Solo las **facturas** se almacenan en la base de datos.
* El proyecto está diseñado para fines académicos.

---

## 👨‍💻 Autor

Proyecto desarrollado como práctica de CRUD con Next.js y Prisma.