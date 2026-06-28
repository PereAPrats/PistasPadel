<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Crea la taula pivot 'club_members' per la relació molts-a-molts
     * entre usuaris i clubs. Un usuari pot ser membre de varis clubs.
     */
    public function up(): void
    {
        Schema::create('club_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('club_id')->constrained()->onDelete('cascade');
            $table->unique(['user_id', 'club_id']);
            $table->timestamps();
        });
    }

    /**
     * Elimina la taula 'club_members'.
     */
    public function down(): void
    {
        Schema::dropIfExists('club_members');
    }
};
