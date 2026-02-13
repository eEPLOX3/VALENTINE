# 💕 Valentine's Day Interactive Page

Una página web romántica e interactiva para San Valentín con animaciones suaves y una propuesta especial.

## 🎯 Características

- ✨ Fondo animado con corazones, flechas, nubes y alas cayendo
- 💌 Carta roja que se abre con animación suave
- 🎵 Música de fondo que comienza al abrir la carta
- 📸 Espacio para foto personalizada
- ✅ Botones interactivos donde "No" está deshabilitado y "Sí" crece cada vez que intentan hacer clic en "No"
- 💖 Explosión de corazones al seleccionar "Sí"
- 🗄️ Integración con Supabase para guardar la respuesta

## 🚀 Configuración Rápida

### 1. Agregar tu música y foto

Coloca estos archivos en la carpeta `valentine/public/`:

- **music.mp3** - Tu canción romántica favorita
- **photo.jpg** - Una foto de ustedes dos (o cualquier imagen romántica)

### 2. Configurar Supabase

#### Crear cuenta y proyecto:
1. Ve a [https://supabase.com](https://supabase.com) y crea una cuenta gratuita
2. Crea un nuevo proyecto
3. Espera a que el proyecto se inicialice (2-3 minutos)

#### Configurar la base de datos:
1. En tu proyecto de Supabase, ve a **SQL Editor** (barra lateral izquierda)
2. Haz clic en **New Query**
3. Abre el archivo `supabase-setup.sql` y copia todo el contenido
4. Pégalo en el editor SQL de Supabase
5. Haz clic en **Run** para ejecutar el script

#### Obtener las credenciales:
1. Ve a **Settings** → **API** en tu proyecto de Supabase
2. Copia el **Project URL** (algo como: `https://xxxxx.supabase.co`)
3. Copia el **anon/public key** (una larga cadena de texto)

#### Configurar en el código:
1. Abre el archivo `main.js`
2. Busca las líneas 5-6:
   ```javascript
   const SUPABASE_URL = 'YOUR_SUPABASE_URL';
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
   ```
3. Reemplaza con tus credenciales:
   ```javascript
   const SUPABASE_URL = 'https://xxxxx.supabase.co';
   const SUPABASE_ANON_KEY = 'tu-larga-clave-aqui';
   ```

### 3. Ajustar el volumen de la música (opcional)

En `main.js`, línea 9:
```javascript
const MUSIC_VOLUME = 0.3; // Cambia entre 0.0 (silencio) y 1.0 (máximo)
```

## 🎮 Ejecutar el proyecto

```bash
npm run dev
```

Abre tu navegador en `http://localhost:5173`

## 📦 Construir para producción

```bash
npm run build
```

Los archivos optimizados estarán en la carpeta `dist/`. Puedes subirlos a cualquier hosting (Netlify, Vercel, GitHub Pages, etc.).

## 🎨 Personalización

### Cambiar colores
Edita las variables CSS en `style.css` (líneas 2-8):
```css
:root {
  --primary-red: #e63946;
  --dark-red: #c1121f;
  --light-pink: #ffb3c1;
  /* ... más colores */
}
```

### Cambiar el mensaje
Edita `index.html`, línea 30:
```html
<h1 class="question">¿Quieres ser mi San Valentín?</h1>
```

### Cambiar los emojis de fondo
Edita `main.js`, línea 32:
```javascript
const elements = ['❤️', '➳', '💘', '☁️', '🕊️', '💕', '💖', '💗', '💝'];
```

## 🛠️ Tecnologías utilizadas

- **Vite** - Build tool ultra-rápido
- **GSAP** - Animaciones profesionales y suaves
- **Supabase** - Base de datos en tiempo real
- **Vanilla CSS** - Animaciones optimizadas con GPU

## 📱 Responsive

La página es completamente responsive y se ve bien en:
- 💻 Desktop
- 📱 Móviles
- 📱 Tablets

## ❤️ Hecho con amor

¡Que tengas un hermoso San Valentín! 💕
