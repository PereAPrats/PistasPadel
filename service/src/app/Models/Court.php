<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Representa una pista de pàdel dins d'un club.
 * Totes les pistes d'un club comparteixen les mateixes franges horàries.
 */
#[Fillable(['club_id', 'name'])]
class Court extends Model
{
    use HasFactory;

    /**
     * Relació N:1 amb clubs: la pista pertany a un club.
     */
    public function club(): BelongsTo
    {
        return $this->belongsTo(Club::class);
    }

    /**
     * Relació 1:N amb bookings: les reserves d'aquesta pista.
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}
