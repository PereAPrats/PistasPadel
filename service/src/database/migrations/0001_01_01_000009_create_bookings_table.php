<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Crea la taula 'bookings' per emmagatzemar les reserves de pistes.
     * La clau única (court_id, match_date, time_slot_id) evita reserves
     * duplicades en una mateixa pista, data i franja horària.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('court_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('match_date');
            $table->foreignId('time_slot_id')->constrained()->onDelete('cascade');
            $table->unique(['court_id', 'match_date', 'time_slot_id'], 'booking_unique');
            $table->timestamps();
        });
    }

    /**
     * Elimina la taula 'bookings'.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
