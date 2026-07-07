# GUÍA DE CONFIGURACIÓN DE SUPABASE

Sigue estos pasos para conectar la plataforma EduCode con Supabase.

---

## 1. Crear el proyecto

1. Ve a https://supabase.com e inicia sesión con GitHub (ya tienes la cuenta vinculada).
2. Haz clic en **"New project"**.
3. Completa:
   - **Organization**: Selecciona tu usuario de GitHub (aparece automáticamente).
   - **Name**: `EduCode`
   - **Database Password**: Elige una contraseña segura (guárdala).
   - **Region**: Elige la más cercana a ti (ej: `South America (São Paulo)`).
4. Espera a que se cree el proyecto (~2 minutos).

---

## 2. Ejecutar el schema SQL

1. Dentro de tu proyecto, ve a **SQL Editor** en el menú lateral.
2. Haz clic en **"New query"**.
3. Abre el archivo `backend/supabase/schema.sql` y copia todo su contenido.
4. Pégalo en el editor SQL.
5. Haz clic en **"Run"** (o presiona `Ctrl+Enter`).

Esto creará:
- Tablas: `profiles`, `modules`, `lessons`, `user_progress`, `user_settings`
- Datos de los 6 módulos con sus lecciones
- Políticas de seguridad (RLS)
- Triggers para actualizar `updated_at` y crear perfil automático al registrarse

---

## 3. Obtener las claves de conexión

1. En el menú lateral, ve a **Project Settings > API**.
2. Copia los siguientes valores:
   - **Project URL** → `SUPABASE_URL`
   - **Anon public** → `SUPABASE_ANON_KEY`
   - **Service Role** (opcional) → `SUPABASE_SERVICE_ROLE_KEY`

---

## 4. Configurar el backend

1. Abre el archivo `backend/.env`.
2. Reemplaza los valores:

```env
PORT=3000
FRONTEND_URL=http://localhost:4200

SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-anon-key
```

---

## 5. Iniciar el backend

```bash
cd backend
npm install
npm run dev
```

Deberías ver: `EduCode API running on http://localhost:3000`

Luego inicia el frontend:

```bash
npm start
```

---

## 6. Verificar conexión

El frontend se conecta automáticamente al backend a través del proxy configurado en `proxy.conf.json`. Cuando el backend esté corriendo:

- Puedes registrarte desde la página `/register`
- Iniciar sesión desde `/login`
- Los datos de progreso, módulos y ajustes se sincronizarán con Supabase

---

## Notas importantes

- **Auth**: Supabase Auth maneja el registro/inicio de sesión. Los emails de confirmación están desactivados por defecto.
- **RLS**: Las políticas de seguridad (RLS) ya están configuradas en el schema SQL. Cada usuario solo puede ver/modificar sus propios datos.
- **Desarrollo**: Si el backend no está corriendo, la app funciona con datos locales almacenados en localStorage.
