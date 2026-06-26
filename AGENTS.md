# AGENTS.md — PistasPadel

Fitxer de configuració per a assistents d'IA (Claude, Cursor, etc.) que col·laboren en el projecte.

## Projecte

**PistasPadel** — Aplicació web de gestió de reserves de pistes de pádel i matchmaking entre jugadors.

## Stack tecnològic

- **Backend:** Laravel 11 + PHP 8.4
- **Frontend:** React 18 + TypeScript + Vite
- **Base de dades:** MySQL 8
- **Autenticació:** Laravel Sanctum (tokens d'API)
- **HTTP Client:** Axios
- **Desplegament:** Docker Compose (3 serveis: front, api, db)
- **Gestió de projecte:** GitHub Projects
- **Control de versions:** Git (amb tag `entrega` per al lliurament)

## Estructura del repositori

```
PistasPadel/
├── .dockerignore
├── .gitignore
├── AGENTS.md
├── README.md
├── LICENSE
├── doc/
│   ├── INSTRUCTIONS.md        # Instruccions de la convocatòria
│   ├── MODEL_REPORT.md        # Plantilla de la memòria
│   ├── Proyecto Padel.md      # Proposta original del company
│   ├── Proyecto Padel.pdf     # Proposta original (PDF)
│   └── REPORT.md              # Memòria tècnica del projecte
├── docker-compose.yml
├── ui/
│   └── src/
│       └── README.md
└── service/
    └── src/
        └── README.md
```

> Nota: `ui/src` conté el frontend React, `service/src` conté el backend Laravel.

## Esquema de la base de dades (9 taules, FNBC)

- **roles** — catàleg de rols (player, owner)
- **users** — usuaris, FK → roles
- **clubs** — clubs de pàdel, owner FK → users
- **club_members** — pivot user↔club (un user pot ser membre de varis clubs)
- **time_slots** — franges horàries per club (day_of_week, start_time, end_time)
- **courts** — pistes d'un club, FK → clubs
- **bookings** — reserves, FK → courts, users, time_slots. UK: (court_id, match_date, time_slot_id)
- **matches** — partits oberts, booking_id FK UK (1:1 amb booking), creator FK → users
- **match_participants** — inscripcions, FK → matches, users. UK: (match_id, user_id)

## API REST (endpoints principals)

| Mètode | Endpoint | Descripció | Auth |
|--------|----------|------------|------|
| POST | /api/register | Registre d'usuari | No |
| POST | /api/login | Inici de sessió | No |
| POST | /api/logout | Tancar sessió | Sí |
| GET | /api/clubs | Llistar clubs | Sí |
| POST | /api/clubs | Crear club (owner) | Sí + Owner |
| GET | /api/clubs/{id} | Detall del club | Sí |
| PUT | /api/clubs/{id} | Actualitzar club | Sí + Owner |
| DELETE | /api/clubs/{id} | Eliminar club | Sí + Owner |
| GET | /api/clubs/{id}/courts | Llistar pistes | Sí |
| POST | /api/clubs/{id}/courts | Crear pista | Sí + Owner |
| DELETE | /api/courts/{id} | Eliminar pista | Sí + Owner |
| GET | /api/clubs/{id}/slots | Llistar franges | Sí |
| POST | /api/clubs/{id}/slots | Crear franja | Sí + Owner |
| GET | /api/bookings?date=&court_id= | Llistar reserves | Sí |
| POST | /api/bookings | Crear reserva | Sí |
| GET | /api/matches | Llistar partits oberts | Sí |
| POST | /api/matches | Crear partit (genera booking automàticament) | Sí |
| POST | /api/matches/{id}/join | Unir-se a un partit | Sí |
| POST | /api/matches/{id}/leave | Sortir d'un partit | Sí |
| GET | /api/owner/bookings | Reserves del club (dashboard owner) | Sí + Owner |

## User Stories

| ID    | Nom                                                         | Prioritat   | Estat    |
|-------|-------------------------------------------------------------|-------------|----------|
| US-01 | Autenticació i control de sessió                            | Must have   | Pendent |
| US-02 | Visualització de clubs i horaris + creació de reserves      | Must have   | Pendent |
| US-03 | Inscripció asíncrona a partits oberts                       | Must have   | Pendent |
| US-04 | Gestió de clubs i instal·lacions (propietari)               | Should have | Pendent |
| US-05 | Cancel·lació de reserves / historial / perfil (futur)       | Could have  | Pendent |

## Regles de codi per a assistents d'IA

### Comentaris al codi
- Afegeix comentaris explicatius a nivell de **funció/mètode** i **bloc lògic** (5-15 línies), no una línia sí i una no.
- Un comentari per funció explicant què fa i per què (si no és obvi).
- Un comentari per bloc lògic dins de funcions llargues (ex. "Validar que l'usuari sigui propietari del club").
- No coments cada variable individual, cada return, o coses com `// incrementar contador`.
- Prioritza codi autodocumentat (noms descriptius) per sobre dels comentaris.

### Estil de codi
- Segueix les convencions de Laravel (PSR-12, nomenclatura snake_case per a DB, camelCase per a JS/TS, etc.).
- React: components funcionals amb hooks, TypeScript strict.
- Noms en català o anglès? **Anglès** per al codi (variables, funcions, rutes), **català** per a textos d'UI i comentaris de bloc a criteri.

### Git
- **Mai treballar directament sobre `dev` o `master`.** Cada tasca nova va en una rama separada (`feat_nom-tasca`).
- Commits freqüents amb missatges descriptius en **anglès** i format `TYPE: Description` (ex. `feat: add club management CRUD endpoints`, `fix: prevent double booking on concurrent requests`).
- Tipus permesos: `feat`, `fix`, `docs`, `chore`, `refactor`.
- `dev` és la rama d'integració. Mai es fa commit directe a `dev`; tot es fusiona via merge des d'una rama de tasca.
- No esborrar l'historial de commits ni fer amend després de push.
- El tag `entrega` es crearà al final del sprint.

## Comandes útils

```bash
# Desenvolupament (cal tenir Docker instal·lat)
docker compose up -d          # Aixeca tot l'entorn
docker compose down           # Atura tot
docker compose logs -f api    # Veure logs del backend
docker compose exec api ...   # Executa comandes dins del contenidor api

# Laravel (dins del contenidor)
docker compose exec api php artisan migrate
docker compose exec api php artisan make:controller ClubController
docker compose exec api composer require paquet

# React (dins del contenidor front o local)
npm run dev
npm run build
```

## Lliurament

- **Data:** 5 de juliol de 2026 a les 23:59h
- El repositori ha de tenir un tag `entrega` apuntant al commit final
- El producte ha de ser funcional amb interfície d'usuari
- Memòria tècnica a `doc/REPORT.md`
- Codi font a `ui/src/` i `service/src/` (o tot a `src/`)