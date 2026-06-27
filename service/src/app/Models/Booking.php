<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * Representa una reserva d'una pista en una data i franja concretes.
 * Opcionalment pot tenir un partit obert associat (1:1 amb Match).
 */
#[Fillable(['court_id', 'user_id', 'match_date', 'time_slot_id'])]
class Booking extends Model
{
    use HasFactory;

    /**
     * Relació N:1 amb courts: la pista reservada.
     */
    public function court(): BelongsTo
    {
        return $this->belongsTo(Court::class);
    }

    /**
     * Relació N:1 amb users: l'usuari que ha fet la reserva.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relació N:1 amb time_slots: la franja horària reservada.
     */
    public function timeSlot(): BelongsTo
    {
        return $this->belongsTo(TimeSlot::class);
    }

    /**
     * Relació 1:1 amb matches: el partit obert associat (si n'hi ha).
     */
    public function match(): HasOne
    {
        return $this->hasOne(MatchGame::class);
    }
}
