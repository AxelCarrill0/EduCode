# Deploy EduCode Full-Stack: Vercel (Frontend) + Railway (Backend)

## Resumen

El frontend Angular ya está en Vercel. El backend Express (Node.js) necesita su propia plataforma ya que usa `app.listen()` persistente y `child_process` para ejecutar Python — ambos incompatibles con Vercel Serverless. La solución es desplegar el backend en **Railway** y conectarlo con el frontend via variable de entorno.

## Arquitectura Final

```
Usuario
  │
  ├──► Vercel (Frontend Angular)
  │      URL: https://educode-xxx.vercel.app
  │      Build: ng build --configuration production
  │      apiUrl → Railway URL
  │
  └──► Railway (Backend Express)
         URL: https://educode-backend-xxx.railway.app
         Rutas: /auth, /modules, /progress, /settings, /execute, /health
         Env vars: SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, FRONTEND_URL
```

---

## Cambios a realizar

### 1. Frontend Angular — Agregar environment de producción

#### [NEW] [environment.production.ts](file:///c:/Users/axelc/Proyectos/EduCode/src/environments/environment.production.ts)
Crear archivo con la URL real del backend de Railway.
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://TU-PROYECTO.railway.app',  // ← se rellena después de crear Railway
};
```

#### [MODIFY] [angular.json](file:///c:/Users/axelc/Proyectos/EduCode/angular.json)
Registrar el file replacement para que en `ng build --configuration production` use `environment.production.ts`.

### 2. Frontend — Actualizar `apiUrl` dinámica

#### [MODIFY] [environment.ts](file:///c:/Users/axelc/Proyectos/EduCode/src/environments/environment.ts)
Cambiar el `apiUrl` local para que apunte a `/` (sin dominio) y dejar que el proxy lo resuelva en dev. En producción, apuntará a la URL de Railway.

> [!IMPORTANT]
> El frontend en Vercel hace llamadas al backend. Actualmente `apiUrl = 'http://localhost:3000'` — esto está hardcodeado, por lo que en producción todas las peticiones fallan. Es el problema más crítico a resolver.

### 3. Backend — Agregar `railway.json` (opcional pero útil)

#### [NEW] [railway.json](file:///c:/Users/axelc/Proyectos/EduCode/backend/railway.json)
Railway lo detecta automáticamente para saber cómo arrancar el servicio.

### 4. Backend — Actualizar `.gitignore` para incluir `backend/.env`

#### [MODIFY] [.gitignore](file:///c:/Users/axelc/Proyectos/EduCode/.gitignore)
Agregar `backend/.env` explícitamente para que nunca se suba al repo. Actualmente solo ignora `/node_modules` y `/dist` del raíz.

### 5. Vercel — Configurar `vercel.json`

#### [NEW] [vercel.json](file:///c:/Users/axelc/Proyectos/EduCode/vercel.json)
Decirle a Vercel cómo buildear Angular y cómo servir el SPA (redirects para rutas Angular).

---

## Pasos manuales que TÚ debes hacer (yo te guío)

### Paso A — Subir el código a GitHub
```bash
git add .
git commit -m "feat: add backend and production environment config"
git push origin main
```

### Paso B — Crear proyecto en Railway
1. Ir a [railway.app](https://railway.app) → Sign up con GitHub
2. New Project → Deploy from GitHub repo → Seleccionar `EduCode`
3. En "Root Directory" escribir: `backend`
4. Railway detectará `package.json` con `"start": "node src/server.js"` automáticamente

### Paso C — Configurar Variables de Entorno en Railway
En el panel de Railway → tu servicio → Variables:
```
SUPABASE_URL=          (el de tu proyecto Supabase)
SUPABASE_ANON_KEY=     (la anon key de Supabase)
SUPABASE_SERVICE_ROLE_KEY=  (la service role key)
FRONTEND_URL=          (https://tu-app.vercel.app)
PORT=3000
```

### Paso D — Obtener la URL de Railway y actualizar el frontend
Después de que Railway despliegue, te da una URL como `https://educode-backend-production.railway.app`.
Esa URL va en `environment.production.ts` como `apiUrl`.

### Paso E — Configurar `ANGULAR_API_URL` en Vercel
En Vercel → tu proyecto → Settings → Environment Variables:
```
No se necesita variable adicional si el environment.production.ts ya tiene la URL hardcoded.
```

### Paso F — Hacer nuevo push y redeploy automático
```bash
git add .
git commit -m "feat: set production backend URL"
git push origin main
```

---

## Verificación

1. ✅ `https://tu-backend.railway.app/health` → devuelve `{"status":"ok"}`
2. ✅ Login desde Vercel funciona sin errores CORS
3. ✅ El ejecutor de Python responde en `/execute`
4. ✅ Módulos y progreso cargan correctamente

---

## Open Questions

> [!NOTE]
> ¿Ya tienes cuenta en Railway o necesitas crearla desde cero?

> [!IMPORTANT]
> El CORS del backend usa `FRONTEND_URL` para restringir el origen. Hay que configurar esa variable con la URL exacta de Vercel ANTES de que funcione el login desde producción.
