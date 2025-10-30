# MyINFO Frontend IOPv1

## 🛠️ Stack Tecnológico

### Core

- **React 19.1.1** - Librería UI
- **TypeScript 5.9** - Lenguaje tipado
- **Vite 7** - Build tool y dev server
- **React Router DOM 7** - Enrutamiento

### UI & Styling

- **Material-UI 7.3** - Sistema de componentes
- **Emotion** - CSS-in-JS
- **Iconify** - Librería de iconos

### Estado & Datos

- **SWR 2.3** - Data fetching y caché
- **Axios 1.13** - Cliente HTTP
- **React Hook Form 7.65** - Gestión de formularios

## 🚀 Inicio Rápido

### Prerrequisitos

```bash
Node.js >= 22.x
npm >= 9.x
```

### Instalación

```bash
git clone git@gitlab.agetic.gob.bo:agetic/iop/v1/my-info-v1/my-info-v1-frontend.git

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
```

### Variables de Entorno

Configura tu archivo `.env` según el ambiente:

| Variable         | Descripción                | Valores Posibles / Ejemplo                                                                   |
| ---------------- | -------------------------- | -------------------------------------------------------------------------------------------- |
| `VITE_APP_ENV`   | Ambiente de ejecución      | `development` \| `test` \| `production`                                                      |
| `VITE_SITE_NAME` | Nombre de la plataforma    | `"Plataforma de Interoperabilidad - v1"`                                                     |
| `VITE_PATH`      | Ruta base de la aplicación | `""` (vacío si está en root) o `"proyectos-base/agetic-next-base-frontend"`                  |
| `VITE_BASE_URL`  | URL del API backend        | `http://localhost:3000/api` (dev)<br/>`https://proyecto-base.test.gtic.gob.bo/ws/api` (test) |

## 📦 Build para Producción

```bash
# Generar build optimizado
npm run build

# La carpeta dist/ contendrá los archivos estáticos
```
