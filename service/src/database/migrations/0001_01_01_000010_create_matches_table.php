<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Crea la taula 'matches' per als partits oberts. Relació 1:1 amb
     * bookings: un booking pot tenir opcionalment un match associat.
     * Si un booking té match, és un partit obert al qual altres usuaris
     * es poden apuntar.
     */
    public function up(): void
    {
        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->unique()->constrained()->onDelete('cascade');
            $table->foreignId('creator_id')->constrained('users');
            $table->unsignedTinyInteger('max_players')->default(4);
            $table->timestamps();
        });
    }

    /**
     * Elimina la taula 'matches'.
     */
    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};
