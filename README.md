# NovaPay - Sistema de Gestion Bancaria

NovaPay es una plataforma de servicios financieros que permite administrar cuentas bancarias, transferencias, depositos, tarjetas, productos y gestion de usuarios con roles (Administrador y Cliente).

---

## Arquitectura

Sistema de **microservicios** compuesto por 6 servicios principales:

| Servicio | Tecnologia | Puerto | Descripcion |
|---|---|---|---|
| `auth-service-novapay` | ASP.NET Core 8 | 3000 | Autenticacion, JWT, registro y login |
| `Novapay-admin` | Node.js + Express | 3001 | API backend para panel administrativo |
| `Novapay-user` | Node.js + Express | 3002 | API backend para clientes |
| `client-admin` | React + Vite | 5173 | Panel de administracion (web) |
| `client-user-novapay` | React + Vite | 5174 | Portal de clientes (web) |
| `client-user-mobile-novapay` | React Native + Expo | 8081 | App movil para clientes |

Todos los servicios backend comparten la misma base de datos **PostgreSQL** (`novapay_db`).

---

## Prerequisitos

Antes de ejecutar el proyecto, ten instalado:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (con Docker Compose v2)
- [Node.js](https://nodejs.org/) v18 o superior
- [npm](https://www.npmjs.com/) (viene con Node.js)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (solo para la app movil)
- [Android Studio](https://developer.android.com/studio) (solo para la app movil, con un emulador creado)

---

## Clonar el proyecto

El proyecto usa **git submodules** para los microservicios. Clonalo con la bandera `--recursive`:

```bash
git clone --recursive https://github.com/marcss-bnajera/NovaPay.git
```

Si ya clonaste sin `--recursive`, inicializa los submodulos manualmente:

```bash
git submodule update --init --recursive
```

---

## Variables de entorno (.env)

Algunos servicios requieren configurar archivos `.env` antes de ejecutarse.

### auth-service-novapay

Copia el ejemplo y ajusta los valores:

```bash
cp auth-service-novapay/.env.example auth-service-novapay/.env
```

Variables importantes a revisar:

| Variable | Descripcion |
|---|---|
| `JwtSettings__SecretKey` | Clave secreta para JWT (minimo 32 caracteres) |
| `SmtpSettings__Username` | Correo Gmail para enviar verificaciones |
| `SmtpSettings__Password` | App Password de Gmail (no la contraseña normal) |

### client-admin

El archivo `.env` ya viene configurado para Docker:

```
VITE_AUTH_URL=http://localhost:3000
VITE_ADMIN_URL=http://localhost:3001/NovaPay/admin/v1
```

Si ejecutas sin Docker, cambia los puertos segun tu configuracion.

### client-user-novapay

Copia el ejemplo:

```bash
cp client-user-novapay/.env.example client-user-novapay/.env
```

### client-user-mobile-novapay

Para el emulador de Android, usa `10.0.2.2` en vez de `localhost`:

```
EXPO_PUBLIC_AUTH_URL=http://10.0.2.2:3000/api/v1/auth
EXPO_PUBLIC_USER=http://10.0.2.2:3002/novapay/v1
```

### Novapay-admin y Novapay-user

Los `.env` de estos servicios ya vienen configurados para Docker (host: `db`). Si ejecutas sin Docker, cambia `DB_HOST` a `localhost`.

---

## Ejecucion

### 1. Levantar los servicios backend con Docker

Desde la carpeta raiz del proyecto:

```bash
docker-compose up --build
```

Esto levanta: PostgreSQL, auth-service, app-admin, app-user, client-admin y client-user.

Los servicios estaran disponibles en:

| Servicio | URL |
|---|---|
| Auth Service (Swagger) | http://localhost:3000/swagger |
| Auth Service (Health) | http://localhost:3000/health |
| Admin API (Health) | http://localhost:3001/NovaPay/admin/v1/check |
| User API (Health) | http://localhost:3002/NovaPay/v1/check |
| Panel Admin (Web) | http://localhost:5173 |
| Portal Cliente (Web) | http://localhost:5174 |

### 2. Ejecutar la app movil (fuera de Docker)

La app movil con Expo no se ejecuta dentro de Docker. Abrí una **terminal separada**:

```bash
cd client-user-mobile-novapay
npm install
npx expo start --android
```

**IMPORTANTE:** Los servicios Docker deben estar corriendo antes de iniciar Expo.

---

## Errores comunes y soluciones

### `AxiosError: Network Error` en la app movil

**Causa:** El emulador de Android no puede acceder a `localhost`.

**Solucion:** Asegurate de que el `.env` del movil use `10.0.2.2` en lugar de `localhost` o una IP de red local.

### `Cannot find module '/app/node_modules/expo/bin/cli'`

**Causa:** Expo esta intentando correr dentro de Docker.

**Solucion:** Ejecuta Expo directamente en tu PC, no desde Docker. El servicio movil no debe estar en `docker-compose.yml`.

### `novapay_db` no acepta conexiones

**Causa:** PostgreSQL no esta listo cuando los servicios backend arrancan.

**Solucion:** El `docker-compose.yml` ya tiene `healthcheck` configurado. Si persiste, ejecuta:

```bash
docker-compose down
docker-compose up --build
```

### Redireccion HTTPS en auth-service (error 301/302)

**Causa:** El auth-service redirige HTTP a HTTPS por defecto.

**Solucion:** Verifica que `DISABLE_HTTPS_REDIRECT: "true"` este en el `docker-compose.yml` bajo el servicio `auth-service`.

### Error de CORS al abrir el panel admin o portal cliente

**Causa:** El origin del navegador no esta en la lista de CORS permitidos.

**Solucion:** Verifica los `Security__AllowedOrigins` en el `docker-compose.yml` del auth-service. Agrega tu origin si es necesario.

### Puerto 3000, 3001, 5173 o 5174 ya en uso

**Causa:** Otro proceso esta usando ese puerto.

**Solucion:** Deten el proceso que usa el puerto o cambia el mapeo de puertos en `docker-compose.yml`.

---

## Estructura del proyecto

```
NovaPay/
├── auth-service-novapay/      # Microservicio de autenticacion (.NET Core 8)
├── Novapay-admin/             # API backend para administradores (Node.js)
├── Novapay-user/              # API backend para clientes (Node.js)
├── client-admin/              # Panel de administracion (React + Vite)
├── client-user-novapay/       # Portal de clientes web (React + Vite)
├── client-user-mobile-novapay/# App movil (React Native + Expo)
├── docker-compose.yml         # Orquestacion de servicios
└── README.md                  # Este archivo
```

---

## Roles del sistema

| Rol | Descripcion |
|---|---|
| `Administrador` | Acceso completo al panel administrativo y a todas las operaciones |
| `Cliente` | Usuario final con acceso limitado a sus propias cuentas y operaciones |

El usuario administrador por defecto es `ADMINB` / `ADMINB`.

---

## Tecnologias

- **Backend:** Node.js, Express 5, Sequelize 6, PostgreSQL
- **Auth:** ASP.NET Core 8, Entity Framework Core 8, JWT, BCrypt.Net
- **Frontend web:** React 18, Vite 8, Tailwind CSS 4, Zustand, React Router 7
- **Movil:** React Native 0.85, Expo 56, React Navigation
- **Infraestructura:** Docker Compose, Cloudinary, Helmet, rate limiting, Winston
