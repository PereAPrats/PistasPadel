# PistasPadel
Web de gestión de pistas de padel

## Cómo colaborar

Para mantener el proyecto organizado, seguro y con un historial limpio, seguimos un flujo de trabajo basado en ramas. **Está totalmente prohibido hacer push directamente a la rama `master`**. Todo cambio debe pasar por un proceso de integración en desarrollo y un Pull Request final.

---

### Estructura de Ramas

* **`master` (Producción):** Contiene el código completamente estable que está en producción. Nadie puede modificar esta rama directamente.
* **`dev` (Desarrollo):** Es la rama de integración. Aquí se juntan todas las nuevas funcionalidades antes de pasar a producción. Es la única rama autorizada para fusionarse con `master`.
* **`feat_nombre-feature` (Locales):** Ramas cortas que creará cada desarrollador en su máquina para trabajar en una tarea específica. No se suben a GitHub.

---

### Flujo de Trabajo Paso a Paso

#### 1. Sincroniza tu entorno local
Antes de empezar cualquier tarea, asegúrate de tener los últimos cambios de la rama de desarrollo:
```bash
git checkout dev
git pull origin dev
```

#### 2. Crea tu rama de funcionalidad (Feature)
Crea una rama local partiendo siempre de **`dev`**. Usa nombres descriptivos con el prefijo **`feat_`**:

```bash
git checkout -b feat_mi-nueva-funcionalidad
```

#### 3. Integra tus cambios en la rama de desarrollo
Una vez que hayas terminado y probado tu funcionalidad en local, debes llevar esos cambios a la rama **`dev`** remota.

⚠️ Nota: Antes de hacer el merge, vuelve a traer lo último de **`dev`** por si algún compañero ha subido cambios mientras tú trabajabas.

```bash
# Volvemos a dev y actualizamos con lo que haya en GitHub
git checkout dev
git pull origin dev

# Fusionamos nuestra feature en dev
git merge feat_mi-nueva-funcionalidad

# Subimos los cambios a GitHub
git push origin dev
```

Una vez hecho esto, puedes borrar tu rama local **`feat_mi-nueva-funcionalidad`** para mantener tu entorno limpio.

#### 4. Paso a Producción (**`master`**)
Cuando la rama dev tenga cambios estables que estén listos para ser desplegados en producción:

* Ve a la interfaz web de **GitHub**.
* Abre un Pull Request (PR) desde la rama **`dev`** hacia la rama **`master`**.
* Revisa que no haya conflictos. Aunque el sistema te permite aprobar el PR a ti mismo, asegúrate de que el código ha sido verificado.
* Haz clic en **Merge Pull Request**.
