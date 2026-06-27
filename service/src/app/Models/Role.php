<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Representa un rol d'usuari dins el sistema (player o owner).
 * Cada rol determina els permisos i funcionalitats accessibles per l'usuari.
 */
#[Fillable(['name'])]
class Role extends Model
{
    use HasFactory;

    /**
     * Relació 1:N amb usuaris: un rol pot tenir molts usuaris assignats.
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
