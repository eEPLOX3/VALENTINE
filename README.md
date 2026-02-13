# 💕 Valentine's Day Interactive Page

Una página web romántica e interactiva para San Valentín con animaciones suaves y una propuesta especial.

## 🎯 Características
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
