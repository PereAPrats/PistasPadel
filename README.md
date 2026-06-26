# PistasPadel

Aplicació web de gestió de reserves de pistes de pádel i matchmaking entre jugadors.

## Continguts del repositori

```
PistasPadel/
├── doc/                    # Documentació i memòria del projecte
│   ├── REPORT.md           # Memòria tècnica
│   ├── INSTRUCTIONS.md     # Instruccions de la convocatòria
│   ├── MODEL_REPORT.md     # Plantilla de la memòria
│   ├── Proyecto Padel.md   # Proposta original
│   └── Proyecto Padel.pdf  # Proposta original (PDF)
├── ui/                     # Frontend (React + TypeScript + Vite)
│   ├── Dockerfile
│   └── src/
├── service/                # Backend (Laravel 11 + PHP)
│   ├── Dockerfile
│   └── src/
├── docker-compose.yml      # Orquestració dels contenidors
├── AGENTS.md               # Configuració per a assistents d'IA
└── README.md
```

## Stack tecnològic

- **Frontend:** React 18 + TypeScript + Vite
- **Backend:** Laravel 11 + PHP 8.x
- **Base de dades:** MySQL 8
- **Autenticació:** Laravel Sanctum
- **Desplegament:** Docker Compose

## Desenvolupament amb Docker

```bash
docker compose up -d
```

- Frontend: http://localhost:5173
- API: http://localhost:8000
- Base de dades: localhost:3306

## Comandes útils

```bash
docker compose down                    # Aturar l'entorn
docker compose logs -f api             # Veure logs del backend
docker compose exec api php artisan migrate   # Executar migracions
docker compose exec api composer require paquet
```

---

## Com col·laborar

Per mantenir el projecte organitzat, segur i amb un historial net, seguim un flux de treball basat en rames. **Està totalment prohibit fer push directament a la rama `master`**.

### Estructura de rames

- **`master`** — Codi estable en producció. No es modifica directament.
- **`dev`** — Rama d'integració. L'única que es pot fusionar amb `master`.
- **`feat_nom-funcionalitat`** — Rames locals per a tasques específiques.

### Flux de treball

1. Sincronitza `dev`: `git checkout dev && git pull origin dev`
2. Crea rama: `git checkout -b feat_mi-funcionalitat`
3. Desenvolupa i fes commit
4. Torna a `dev`, actualitza i fusiona:
   ```bash
   git checkout dev && git pull origin dev
   git merge feat_mi-funcionalitat
   git push origin dev
   ```
5. Obre un Pull Request des de `dev` a `master` a GitHub

