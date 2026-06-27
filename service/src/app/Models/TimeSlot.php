<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Representa una franja horària disponible per a un club.
 * Totes les pistes del club comparteixen les mateixes franges.
 */
#[Fillable(['club_id', 'day_of_week', 'start_time', 'end_time'])]
class TimeSlot extends Model
{
    use HasFactory;

    /**
     * Relació N:1 amb clubs: la franja pertany a un club.
     */
    public function club(): BelongsTo
    {
        return $this->belongsTo(Club::class);
    }

    /**
     * Relació 1:N amb bookings: les reserves que usen aquesta franja.
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}
