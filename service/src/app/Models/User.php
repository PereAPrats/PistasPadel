<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * Representa un usuari del sistema, ja sigui jugador (player) o
 * propietari de club (owner). L'autenticació es fa via tokens
 * Sanctum, i cada usuari té un rol que en determina els permisos.
 */
#[Fillable(['name', 'email', 'password', 'role_id'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Atributs que s'han de transformar automàticament en altres tipus.
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Relació N:1 amb roles: un usuari pertany a un sol rol.
     */
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * Comprova si l'usuari té un rol concret (p. ex. 'owner' o 'player').
     */
    public function hasRole(string $role): bool
    {
        return $this->role?->name === $role;
    }
}
