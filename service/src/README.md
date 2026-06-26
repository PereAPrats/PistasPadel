# PistasPadel — Backend

API REST Laravel 11 + PHP 8.x.

## Requisits

- PHP 8.3 o superior (recomanat PHP 8.4)
- Composer 2
- MySQL 8
- Extensions PHP: pdo_mysql, mbstring, zip, gd

## Instal·lació

```bash
composer install
cp .env.example .env
php artisan key:generate
```

Configura la base de dades al fitxer `.env`.

## Migracions

```bash
php artisan migrate
```

## Desenvolupament

```bash
php artisan serve
```

L'API estarà disponible a `http://localhost:8000`.

## Tests

```bash
php artisan test
```
