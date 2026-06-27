<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Crea la taula 'time_slots' per definir les franges horàries
     * disponibles per cada club. Totes les pistes del club comparteixen
     * les mateixes franges.
     */
    public function up(): void
    {
        Schema::create('time_slots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('club_id')->constrained()->onDelete('cascade');
            $table->unsignedTinyInteger('day_of_week'); // 0 (Diumenge) a 6 (Dissabte)
            $table->time('start_time');
            $table->time('end_time');
            $table->timestamps();
        });
    }

    /**
     * Elimina la taula 'time_slots'.
     */
    public function down(): void
    {
        Schema::dropIfExists('time_slots');
    }
};
