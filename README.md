# 🏦 NovaPay - Sistema de Gestión Bancaria

**NovaPay** es una API robusta diseñada para la administración de servicios financieros, permitiendo el control de cuentas, transferencias entre usuarios, depósitos, gestión de productos y seguridad basada en roles.

---

## 🚀 Tecnologías Utilizadas

* **Node.js**: Entorno de ejecución para JavaScript.
* **Express**: Framework para la construcción de la API.
* **PostgreSQL**: Base de datos y modelado de datos.
* **Docker**: Contenerización para despliegue consistente.
* **Bcryptjs & JWT**: Seguridad y autenticación.

---

## 📁 Estructura del Proyecto

```text
NovaPay/
├── configs/              # Configuración de App, DB y Logger
├── middlewares/          # Validaciones, Errores y Request Limit
├── scr/                  # Código fuente (Servicios)
│   ├── accounts/         # Cuentas bancarias
│   ├── currencies/       # Gestión de divisas
│   ├── deposits/         # Registro de depósitos
│   ├── favorites/        # Cuentas favoritas
│   ├── products/         # Catálogo de servicios/productos
│   ├── roles/            # Gestión de niveles de acceso
│   ├── shoppings/        # Historial de compras
│   ├── transactions/     # Movimientos generales
│   ├── transfers/        # Transferencias de fondos
│   └── users/            # Administración de usuarios
├── Dockerfile            # Configuración de imagen
├── docker-compose.yml    # Orquestación de servicios
└── index.js              # Punto de entrada
```

## 📑 Documentación de Endpoints

💳 Cuentas (Accounts)

| Método        |   Endpoint    |       Descripción         |      Auth     |
| ------------- |:-------------:|:-------------------------:|:-------------:|
| GET           | `/accounts/`  | Listar todas las cuentas  |   Admin       |
| GET           | `/accounts/id`| Obtener cuenta por ID     |   Admin/User  |
| POST          | `/accounts/`  | Crear una nueva cuenta    |   Admin       |
| PUT           | `/accounts/id`| Actualizar una cuenta     |   Admin       |
| DELETE        | `/accounts/id`| Eliminar una cuenta       |   Admin       |

💱 Monedas (Currencies)

| Método |     Endpoint     |        Descripción       |  Auth |
| ------ | :--------------: | :----------------------: | :---: |
| GET    |  `/currencies/`  | Listar todas las monedas | Admin |
| POST   |  `/currencies/`  |  Crear una nueva moneda  | Admin |
| PUT    | `/currencies/id` |   Actualizar una moneda  | Admin |
| DELETE | `/currencies/id` |    Eliminar una moneda   | Admin |

💰 Depósitos (Deposits)
| Método |    Endpoint    |         Descripción        |    Auth    |
| ------ | :------------: | :------------------------: | :--------: |
| GET    |  `/deposits/`  | Listar todos los depósitos |    Admin   |
| GET    | `/deposits/id` |   Obtener depósito por ID  | Admin/User |
| POST   |  `/deposits/`  |   Crear un nuevo depósito  | Admin/User |
| PUT    | `/deposits/id` |   Actualizar un depósito   |    Admin   |
| DELETE | `/deposits/id` |    Eliminar un depósito    |    Admin   |

🛍 Productos (Products)
| Método |    Endpoint    |         Descripción        |    Auth    |
| ------ | :------------: | :------------------------: | :--------: |
| GET    |  `/products/`  | Listar todos los productos | Admin/User |
| GET    | `/products/id` |   Obtener producto por ID  | Admin/User |
| POST   |  `/products/`  |   Crear un nuevo producto  |    Admin   |
| PUT    | `/products/id` |   Actualizar un producto   |    Admin   |
| DELETE | `/products/id` |    Eliminar un producto    |    Admin   |

👥 Roles (Roles)

| Método |   Endpoint  |       Descripción      |  Auth |
| ------ | :---------: | :--------------------: | :---: |
| GET    |  `/roles/`  | Listar todos los roles | Admin |
| GET    | `/roles/id` |   Obtener rol por ID   | Admin |
| POST   |  `/roles/`  |   Crear un nuevo rol   | Admin |
| PUT    | `/roles/id` |    Actualizar un rol   | Admin |
| DELETE | `/roles/id` |     Eliminar un rol    | Admin |


🛒 Compras (Shoppings)

| Método |     Endpoint    |        Descripción       |    Auth    |
| ------ | :-------------: | :----------------------: | :--------: |
| GET    |  `/shoppings/`  | Listar todas las compras |    Admin   |
| GET    | `/shoppings/id` |   Obtener compra por ID  | Admin/User |
| POST   |  `/shoppings/`  |  Crear una nueva compra  | Admin/User |
| PUT    | `/shoppings/id` |   Actualizar una compra  |    Admin   |
| DELETE | `/shoppings/id` |    Eliminar una compra   |    Admin   |


💸 Transacciones (Transactions)

| Método |      Endpoint      |           Descripción          |    Auth    |
| ------ | :----------------: | :----------------------------: | :--------: |
| GET    |  `/transactions/`  | Listar todas las transacciones |    Admin   |
| GET    | `/transactions/id` |   Obtener transacción por ID   | Admin/User |
| POST   |  `/transactions/`  |   Crear una nueva transacción  | Admin/User |
| PUT    | `/transactions/id` |   Actualizar una transacción   |    Admin   |
| DELETE | `/transactions/id` |    Eliminar una transacción    |    Admin   |

🔁 Transferencias (Transfers)

| Método |     Endpoint    |           Descripción           |    Auth    |
| ------ | :-------------: | :-----------------------------: | :--------: |
| GET    |  `/transfers/`  | Listar todas las transferencias |    Admin   |
| GET    | `/transfers/id` |   Obtener transferencia por ID  | Admin/User |
| POST   |  `/transfers/`  |  Crear una nueva transferencia  | Admin/User |
| PUT    | `/transfers/id` |   Actualizar una transferencia  |    Admin   |
| DELETE | `/transfers/id` |    Eliminar una transferencia   |    Admin   |

👤 Usuarios (Users)

| Método |   Endpoint  |        Descripción        |  Auth |
| ------ | :---------: | :-----------------------: | :---: |
| GET    |  `/users/`  | Listar todos los usuarios | Admin |
| GET    | `/users/id` |   Obtener usuario por ID  | Admin |
| POST   |  `/users/`  |   Crear un nuevo usuario  | Admin |
| PUT    | `/users/id` |   Actualizar un usuario   | Admin |
| DELETE | `/users/id` |    Eliminar un usuario    | Admin |

---

## 🚀 Ejecución con Docker
Este proyecto está listo para desplegarse mediante contenedores:

**Construir y levantar:**
```bash
docker-compose up --build
```

**Acceso:**
La API estará disponible en `http://localhost:3000` (o el puerto configurado en tu `.env`).

