<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Representa un club de pàdel. Cada club pertany a un propietari
 * (owner) i té pistes, franges horàries i membres associats.
 */
#[Fillable(['name', 'address', 'phone', 'owner_id'])]
class Club extends Model
{
    use HasFactory;

    /**
     * Relació N:1 amb users: el propietari del club.
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    /**
     * Relació 1:N amb courts: les pistes del club.
     */
    public function courts(): HasMany
    {
        return $this->hasMany(Court::class);
    }

    /**
     * Relació 1:N amb time_slots: les franges horàries del club.
     */
    public function timeSlots(): HasMany
    {
        return $this->hasMany(TimeSlot::class);
    }

    /**
     * Relació molts-a-molts amb users: els membres del club.
     */
    public function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'club_members');
    }
}
