<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Crea la taula 'courts' per emmagatzemar les pistes de cada club.
     * Cada pista pertany a un club i té un nom únic dins d'aquest club.
     */
    public function up(): void
    {
        Schema::create('courts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('club_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->unique(['club_id', 'name']);
            $table->timestamps();
        });
    }

    /**
     * Elimina la taula 'courts'.
     */
    public function down(): void
    {
        Schema::dropIfExists('courts');
    }
};
