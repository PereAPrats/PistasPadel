<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * Representa un partit obert creat a partir d'una reserva.
 * Altres usuaris es poden apuntar com a participants fins
 * arribar al límit de jugadors (max_players).
 *
 * El nom del model és MatchGame per evitar conflictes amb
 * la paraula reservada match de PHP 8.
 */
#[Fillable(['booking_id', 'creator_id', 'max_players'])]
class MatchGame extends Model
{
    use HasFactory;

    /**
     * Nom de la taula a la base de dades.
     */
    protected $table = 'matches';

    /**
     * Relació N:1 amb bookings: el partit es basa en una reserva.
     */
    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }

    /**
     * Relació N:1 amb users: el creador del partit.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    /**
     * Relació molts-a-molts amb users: els participants del partit.
     */
    public function participants(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'match_participants');
    }
}
