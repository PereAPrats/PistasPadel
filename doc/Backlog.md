# Backlog de Tareas

> Basado en la arquitectura final: 9 tablas (FNBC), 4 User Stories.

---

## US-01: Autenticación y control de sesión

### Base de datos
- [ ] Crear migración `roles` (id, name: player|owner)
- [ ] Modificar migración `users` por defecto: añadir `role_id` FK → roles, eliminar campo innecesarios

### Backend
- [/] Instalar y configurar Laravel Sanctum — ✅ instalado con composer, ❌ pendiente publicar config y activar middleware
- [ ] Implementar `AuthController` con register, login, logout
- [ ] Configurar rutas protegidas con middleware `auth:sanctum`

### Frontend
- [ ] Instalar Axios y configurar interceptor para adjuntar token Bearer en cada petición
- [ ] Crear `AuthContext` (React Context): guarda token + usuario + rol en localStorage
- [ ] Diseñar `LoginPage` (formulario controlado con useState + llamada a API)
- [ ] Diseñar `RegisterPage` (formulario con nombre, email, password, selección de rol)
- [ ] Proteger rutas privadas en React: redirigir a /login si no hay token

---

## US-02: Visualización de clubs y horarios + creación de reservas

### Base de datos
- [ ] Crear migración `clubs` (id, name, address, phone, owner_id FK → users)
- [ ] Crear migración `club_members` (id, user_id FK, club_id FK) con UK(user_id, club_id)
- [ ] Crear migración `time_slots` (id, club_id FK, day_of_week, start_time, end_time)
- [ ] Crear migración `courts` (id, club_id FK, name) con UK(club_id, name)
- [ ] Crear migración `bookings` (id, court_id FK, user_id FK, match_date, time_slot_id FK) con UK(court_id, match_date, time_slot_id)

### Backend
- [ ] Implementar `ClubController@index` → GET /api/clubs (lista de clubs)
- [ ] Implementar `CourtController@index` → GET /api/clubs/{id}/courts (pistas de un club)
- [ ] Implementar `TimeSlotController@index` → GET /api/clubs/{id}/slots (franjas de un club)
- [ ] Implementar `BookingController@store` → POST /api/bookings con control de concurrencia (devuelve HTTP 422 si ya está reservado)
- [ ] Implementar GET /api/bookings?date=&court_id= (listar reservas filtradas)

### Frontend
- [ ] Diseñar `ClubListPage` (lista de clubs con `ClubCard`: nombre, dirección)
- [ ] Diseñar `ClubDetailPage` (seleccionar fecha, ver pistas del club)
- [ ] Crear componente `CourtSlot` (graella: filas = pistas, columnas = franjas horarias)
- [ ] `useEffect` para cargar franjas ocupadas al cambiar fecha o club
- [ ] Lógica del botón "Reservar" → POST a /api/bookings + actualizar estado local

---

## US-03: Inscripción asíncrona a partidos abiertos

### Base de datos
- [ ] Crear migración `matches` (id, booking_id FK UK, creator_id FK, max_players) — 1:1 con booking
- [ ] Crear migración `match_participants` (id, match_id FK, user_id FK) con UK(match_id, user_id)

### Backend
- [ ] Definir modelo `Match` con relaciones (belongsTo creator, belongsToMany participants, belongsTo booking)
- [ ] Implementar `MatchController@store` → POST /api/matches (crea booking automáticamente + match)
- [ ] Implementar `MatchController@index` → GET /api/matches (lista partidos abiertos con plazas restantes)
- [ ] Implementar `MatchController@join` → POST /api/matches/{id}/join (validar aforo: count < max_players)
- [ ] Implementar `MatchController@leave` → POST /api/matches/{id}/leave (eliminar de match_participants)

### Frontend
- [ ] Diseñar `MatchListPage` (lista de partidos abiertos)
- [ ] Crear componente `MatchCard` (creador, hora, plazas X/Y, botón "Apuntarse"/"Salir")
- [ ] Lógica reactiva del botón: al pulsar, hace POST y actualiza contador sin recargar
- [ ] Bloquear botón "Unirse" si aforo completo (X == max_players)

---

## US-04: Gestión de clubs e instalaciones (propietario)

### Backend
- [ ] Implementar middleware `OwnerMiddleware`: verifica que el usuario autenticado es el owner del club
- [ ] Implementar `ClubController@store` → POST /api/clubs (crear club, solo users con role=owner)
- [ ] Implementar `ClubController@update` → PUT /api/clubs/{id} (solo owner del club)
- [ ] Implementar `ClubController@destroy` → DELETE /api/clubs/{id} (solo owner)
- [ ] Implementar `CourtController@store` → POST /api/clubs/{id}/courts (solo owner)
- [ ] Implementar `CourtController@destroy` → DELETE /api/courts/{id} (solo owner)
- [ ] Implementar `TimeSlotController@store` → POST /api/clubs/{id}/slots (solo owner)
- [ ] Implementar `TimeSlotController@destroy` → DELETE /api/time_slots/{id} (solo owner)
- [ ] Implementar GET /api/owner/bookings (dashboard: reservas de todas las pistas del club)

### Frontend
- [ ] Diseñar `OwnerDashboardPage` (panel principal del propietario)
- [ ] Formularios para crear/editar/eliminar pistas del club
- [ ] Formularios para crear/eliminar franjas horarias del club
- [ ] Calendario visual de reservas del club

---

## General / Infraestructura

- [ ] Crear `DatabaseSeeder`: roles (player, owner), clubs de ejemplo, courts, time_slots, bookings de prueba
- [ ] Exportar colección de Postman con todos los endpoints para pruebas
- [ ] Prueba de flujo completo: registrar usuario → listar clubs → reservar pista → crear partido → unirse con otro usuario
- [ ] Registrar horas dedicadas por cada miembro para REPORT.md (sección 6)
