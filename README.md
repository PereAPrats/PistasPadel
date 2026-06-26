# PistasPadel

Aplicació web de gestió de reserves de pistes de pádel i matchmaking entre jugadors.

## Continguts del repositori

```
PistasPadel/
├── doc/                    # Documentació i memòria del projecte
├── ui/                     # Frontend (React + TypeScript + Vite)
├── service/                # Backend (Laravel 11 + PHP 8.4)
├── db/                     # Scripts d'inicialització de la BD
├── docker-compose.yml      # Orquestració dels contenidors
├── AGENTS.md               # Configuració per a assistents d'IA
└── README.md
```

## Stack tecnològic

- **Frontend:** React 18 + TypeScript + Vite
- **Backend:** Laravel 11 + PHP 8.4
- **Base de dades:** MySQL 8
- **Autenticació:** Laravel Sanctum
- **Desplegament:** Docker Compose

---

## Primers passos (per a nous membres)

### 1. Instal·lar Docker

Necessites Docker per arrencar l'entorn. Tria el teu sistema:

| Sistema | Què instal·lar |
|---------|---------------|
| **Windows** | Docker Desktop (requereix WSL2) → https://docs.docker.com/desktop/setup/install/windows-install/ |
| **Mac** | Docker Desktop → https://docs.docker.com/desktop/setup/install/mac-install/ |
| **Linux (Ubuntu/Debian)** | `sudo apt update && sudo apt install docker.io docker-compose-v2` |
| **Linux (Fedora)** | `sudo dnf install docker docker-compose` |

Verifica que Docker funciona:
```bash
docker --version
docker compose version
```

### 2. Clonar el repositori

```bash
git clone https://github.com/PereAPrats/PistasPadel.git
cd PistasPadel
```

### 3. Arrencar l'entorn (primera vegada)

```bash
docker compose up -d
```

Aquest comandament:
1. **Descarrega** les imatges de MySQL, PHP i Node (només la primera vegada)
2. **Construeix** els contenidors de l'API i el frontend
3. **Arrenca** tot: base de dades, API i frontend

Pots trigar uns minuts la primera vegada.

### 4. Accedir a l'aplicació

| Servei | URL |
|--------|-----|
| **Frontend** | http://localhost:5173 |
| **API** | http://localhost:8000 |
| **Base de dades** | localhost:3306 (usuari: `padel_user`, password: `padel_pass`) |

---

## Comandes bàsiques de Docker

| Què vols fer? | Comandament |
|---------------|-------------|
| **Arrencar tot** | `docker compose up -d` |
| **Aturar tot** | `docker compose down` |
| **Veure logs de l'API** | `docker compose logs -f api` |
| **Veure logs del frontend** | `docker compose logs -f front` |
| **Executar migracions** | `docker compose exec api php artisan migrate` |
| **Executar una comanda a l'API** | `docker compose exec api php artisan ...` |
| **Reiniciar un servei** | `docker compose restart api` |
| **Reconstruir després de canvis** | `docker compose build` |

---

## Com treballar amb Git (pas a pas)

Seguiu un flux de treball basat en rames. **Està prohibit fer push directament a `master`**.

### Estructura de rames

- **`master`** — Codi estable. No es toca directament.
- **`dev`** — Rama d'integració. Aquí es fusiona tot.
- **`feat_nom-tasca`** — La teva rama de treball local.

### Situació 1: "Vull començar una tasca"

```bash
# 1. Assegurar-te que estàs a dev i tens l'última versió
git checkout dev
git pull origin dev

# 2. Crear la teva rama de treball
git checkout -b feat_nom-de-la-teva-tasca
```

Exemples de noms de rama: `feat_register-form`, `feat_club-crud`, `feat_fix-navbar`.

### Situació 2: "He acabat la tasca, vull pujar els canvis"

```bash
# 1. Marcar tots els fitxers nous/modificats
git add .

# 2. Crear un commit amb un missatge descriptiu
git commit -m "feat: descripció del que has fet"

# 3. Tornar a la rama dev
git checkout dev

# 4. Baixar possibles canvis dels companys
git pull origin dev

# 5. Fusionar la teva tasca a dev
git merge feat_nom-de-la-teva-tasca

# 6. Pujar tot a GitHub
git push origin dev
```

**Consell:** Fes `git add .` i `git commit` sovint, no esperis a tenir-ho tot acabat.
Els missatges de commit han de ser en anglès i seguir el format:
- `feat: ...` (nova funcionalitat)
- `fix: ...` (correcció d'error)
- `docs: ...` (documentació)
- `refactor: ...` (millora de codi sense canviar comportament)

### Situació 3: "Hi ha conflictes (git diu CONFLICT)"

No espantar-se. Vol dir que dos heu tocat el mateix fitxer.

```bash
# 1. Obre els fitxers que diu git (els marca com a "both modified")
# 2. Busca dins el fitxer les marques:
#    <<<<<<< HEAD
#    ... el teu codi ...
#    =======
#    ... el codi del company ...
#    >>>>>>> feat_...
# 3. Tria què conservar (parla amb el company si cal)
# 4. Guarda el fitxer
# 5. Digues a git que està resolt
git add .
git commit -m "fix: resolve merge conflict"
```

---

## Problemes freqüents

### "docker: command not found"

Docker no està instal·lat. Ves a [docker.com](https://docker.com) i instal·la Docker Desktop (Windows/Mac) o el paquet de Docker (Linux).

### "Port 3306 already in use"

Tens MySQL instal·lat al teu PC que ocupa el port 3306. Atura'l:
- **Windows/Mac:** `docker compose stop` → atura MySQL del sistema → `docker compose up -d`
- **Linux:** `sudo systemctl stop mysql` i després `docker compose up -d`

### "Permission denied" (Linux)

El teu usuari no té permís per usar Docker. Solució:
```bash
sudo usermod -aG docker $USER
```
Tanca sessió i torna a entrar. Prova amb `docker ps`.

### L'API no arrenca

```bash
docker compose logs api
```
Si l'error diu "SQLSTATE[HY000] [1045]", la BD encara no està llesta — espera uns segons i fes `docker compose restart api`.
Si l'error és de clau, executa `docker compose exec api php artisan key:generate`.

### "npm install" o "composer install" fallen

Els contenidors ja tenen les dependències instal·lades. Si afegiu una nova dependència:
```bash
docker compose exec api composer require nom-del-paquet
docker compose exec front npm install nom-del-paquet
```
Això instal·la dins del contenidor i actualitza `composer.json` / `package.json` al teu disc dur.

---

## En resum: el teu dia a dia

1. `docker compose up -d` — arrencar l'entorn
2. Anar a http://localhost:5173 — treballar al frontend
3. Anar a http://localhost:8000 — consultar l'API
4. `git checkout -b feat_...` — crear rama
5. Programar i guardar canvis
6. `git add . && git commit -m "feat: ..."` — desar progrés
7. Repetir 5-6 fins acabar la tasca
8. `git checkout dev && git merge feat_... && git push` — pujar canvis
9. `docker compose down` — aturar l'entorn al final del dia
