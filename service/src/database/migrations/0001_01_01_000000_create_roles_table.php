<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Crea la taula 'roles' amb el catàleg de rols del sistema.
     * Conté els valors: 'player' (jugador) i 'owner' (propietari de club).
     */
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->timestamps();
        });
    }

    /**
     * Elimina la taula 'roles'.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
