---
name: ceramicka
description: Agente central especializado para el e-commerce de artesanías Ceramicka. Stack: React + Vite + TypeScript + Supabase + TailwindCSS.
license: MIT
compatibility: opencode
metadata:
  audience: developers
  workflow: github
---

# Ceramicka Agent

E-commerce de artesanías hecho en cerámica. Stack: React + Vite + TypeScript + Supabase + TailwindCSS.

## Estructura del Proyecto

```
ceramicka-ecommerce/
├── src/
│   ├── components/
│   │   ├── categories/CategoriesForm.tsx
│   │   ├── products/ProductForm.tsx, CardProduct.tsx, ProductFilters.tsx
│   │   ├── shared/Navbar.tsx, Footer.tsx, Logos.tsx, ProtectedLayout.tsx
│   │   └── shared/home/Banner.tsx, ProductGrid.tsx, Newsletter.tsx, Brands.tsx, FeatureGrid.tsx
│   ├── context/AuthContext.tsx
│   ├── hooks/useAuth.ts
│   ├── lib/supabaseClient.ts
│   ├── services/productService.ts, authAccountService.ts
│   ├── Pages/HomePage.tsx, ProductList.tsx, AdminPanel.tsx, LoginAdmin.tsx, Account.tsx, Stock.tsx, ResetPassword.tsx
│   ├── constants/links.tsx
│   └── router/index.tsx
```

## Base de Datos - Supabase

### Tablas
- **product**: id, name, description, price, images (Cloudinary URL), category_id, stock, created_at, deleted_at (soft delete)
- **category**: id, name, description, created_at
- **profiles**: id (FK auth.users), full_name, phone_number, updated_at

### Variables de Entorno
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_SITE_URL (dominio de producción para recuperación de contraseña)

## Servicios Backend

### supabaseClient.ts
```typescript
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)
```

### productService.ts
- getProducts(limit?): Productos activos (no eliminados, stock > 0)
- getProdductById(id): Producto por ID
- updateProduct(id, updates): Actualiza producto
- deleteProduct(id): Soft delete (marca deleted_at)

### authAccountService.ts
- getProfile(): Usuario + perfil de profiles
- updateAccount(userId, updates, authUpdates?): Actualiza perfil y/o auth
- updateEmail(newEmail): Actualiza email

## Sistema de Autenticación

### AuthContext.tsx
Estado global de autenticación con soporte para modo recuperación:
- `user`: Usuario de Supabase
- `isAuthenticated`: Booleano
- `isRecovering`: true cuando el usuario llegó via link de recuperación
- `logout()`: Cierra sesión y limpia modo recuperación

### PASSWORD_RECOVERY Flow
1. Usuario hace clic en "Olvidaste tu contraseña" en LoginAdmin
2. supabase.auth.resetPasswordForEmail(email, { redirectTo: `${VITE_SITE_URL}/reset-password` })
3. Usuario recibe email con link
4. Al hacer clic, Supabase crea sesión temporal y dispara evento PASSWORD_RECOVERY
5. AuthContext detecta evento y activa isRecovering = true
6. ProtectedLayout redirige a /reset-password si isRecovering
7. Navbar oculta opciones de admin durante recuperación
8. ResetPassword actualiza contraseña y llama signOut()
9. Usuario debe loguearse manualmente con nueva contraseña

### Rutas Protegidas (bloqueadas durante recuperación)
- /account
- /adminPanel
- /productList

### Rutas Públicas
- / (HomePage)
- /stock
- /product/:id
- /loginAdmin
- /reset-password

## Reglas de Desarrollo
1. No modificar tablas de Supabase - usar soft delete con deleted_at
2. Imágenes - subir a Cloudinary (upload_preset: ceramicka_images), no a Supabase Storage
3. Autenticación - Supabase Auth + tabla profiles
4. Tipo de datos - siempre TypeScript
5. Estilo - TailwindCSS
6. Formularios - validar campos requeridos

## IMPORTANTE
Al hacer cambios en el backend, actualizar este AGENTS.md con la nueva información.
