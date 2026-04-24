---
name: ceramicka
description: Agente especializado para el e-commerce de artesanías Ceramicka
---

# Ceramicka - E-commerce de artesanías

E-commerce de artesanías feito en cerámica. Stack: React + Vite + TypeScript + Supabase + TailwindCSS.

## Estructura del Proyecto

```
ceramicka-ecommerce/
├── src/
│   ├── components/
│   │   ├── categories/CategoriesForm.tsx
│   │   ├── products/
│   │   │   ├── ProductForm.tsx      # Formulario para crear productos
│   │   │   ├── CardProduct.tsx
│   │   │   └── ProductFilters.tsx
│   │   └── shared/
│   │       ├── Navbar.tsx
│   │       ├── Footer.tsx
│   │       ├── Logos.tsx
│   │       └── home/
│   │           ├── Banner.tsx
│   │           ├── ProductGrid.tsx
│   │           ├── Newsletter.tsx
│   │           ├── Brands.tsx
│   │           └── FeatureGrid.tsx
│   ├── context/
│   │   └── AuthContext.tsx          # Provider de autenticación
│   ├── hooks/
│   │   └── useAuth.ts
│   ├── lib/
│   │   └── supabaseClient.ts       # Cliente de Supabase
│   ├── services/
│   │   ├── productService.ts      # CRUD de productos
│   │   └── authAccountService.ts # Gestión de cuenta de usuario
│   ├── Pages/
│   │   ├── HomePage.tsx
│   │   ├── ProductList.tsx
│   │   ├── AdminPanel.tsx
│   │   ├── LoginAdmin.tsx
│   │   ├── Account.tsx
│   │   └── Stock.tsx
│   ├── constants/links.tsx
│   └── router/index.tsx
```

## Base de Datos - Supabase

### Tablas

**product**
- `id`: string/number (PK)
- `name`: string
- `description`: text
- `price`: number
- `images`: string (URL de Cloudinary)
- `category_id`: string (FK)
- `stock`: number
- `created_at`: timestamp
- `deleted_at`: timestamp (soft delete)

**category**
- `id`: string (PK)
- `name`: string
- `description`: text
- `created_at`: timestamp

**profiles** (Supabase Auth)
- `id`: string (FK a auth.users)
- `full_name`: string
- `phone_number`: string
- `updated_at`: timestamp

### Variables de Entorno

```
VITE_SUPABASE_URL=<url-supabase>
VITE_SUPABASE_ANON_KEY=<anon-key>
```

## Servicios Backend

### supabaseClient.ts

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### productService.ts

Funciones exportadas:
- `getProducts(limit?: number)`: Obtiene productos activos (no eliminados, stock > 0)
- `getProdductById(id)`: Obtiene un producto por ID
- `updateProduct(id, updates)`: Actualiza un producto
- `deleteProduct(id)`: Soft delete (marca `deleted_at` con fecha actual)

Interfaz Product:
```typescript
interface Product {
    id: string | number;
    name: string;
    description?: string;
    price?: number;
    images?: string | string[];
    created_at?: string;
    deleted_at?: string | null;
    stock: number;
    category_id?: string;
}
```

### authAccountService.ts

```typescript
accountService = {
    getProfile(): Obtiene el usuario actual y su perfil de la tabla profiles
    
    updateAccount(userId, updates, authUpdates?): Actualiza perfil y/o auth (email/password)
    
    updateEmail(newEmail): Actualiza el email del usuario
}
```

## Componentes

### CategoriesForm.tsx
- Formulario para crear categorías
- Campos: name, description
- Inserta en tabla `category`

### ProductForm.tsx
- Formulario para crear productos
- Sube imagen a Cloudinary (upload_preset: `ceramicka_images`)
- Campos: name, price, description, category_id, images
- Inserta en tabla `product`

### AuthContext.tsx
- Provider que gestiona estado de autenticación
- Expone: `user`, `isAuthenticated`, `logout()`
- Usa `supabase.auth.onAuthStateChange`

## Rutas

- `/`: HomePage
- `/productList`: Lista de productos
- `/adminPanel`: Panel de admin (requiere auth)
- `/loginAdmin`: Login de administrador
- `/account`: Cuenta del usuario
- `/stock`: Gestión de stock
- `/reset-password`: Recuperación de contraseña

## LoginAdmin.tsx

Sistema de login con recuperación de contraseña:
- `handleLogin()`: Inicia sesión con email/password
- `handleResetPassword()`: Envía email de recuperación via `supabase.auth.resetPasswordForEmail(email, { redirectTo })`

## ResetPassword.tsx

Página para establecer nueva contraseña:
- `handleReset()`: Usa `supabase.auth.updateUser({ password })`
- Valida que contraseñas coincidan y tenga al menos 6 caracteres
- Redirige al login después de 3 segundos

## Reglas de Desarrollo

1. **No modificar las tablas de Supabase** - Usar soft delete con `deleted_at`
2. **Imágenes** - Se suben a Cloudinary, no guardar en Supabase Storage
3. **Autenticación** - Usar Supabase Auth + tabla profiles
4. **Tipo de datos** - Siempre usar TypeScript
5. **Estilo** - TailwindCSS con configuración existente
6. **Formularios** - Validar campos requeridos antes de submit

## IMPORTANTE - Actualización del Agente

Cuando hagas cambios en elbackend (nuevas tablas, servicios, componentes, rutas), **actualiza este archivo AGENTS.md** con la nueva información.