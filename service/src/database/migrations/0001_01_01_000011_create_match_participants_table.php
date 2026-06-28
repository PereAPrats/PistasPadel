<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Crea la taula pivot 'match_participants' per emmagatzemar els
     * usuaris inscrits a cada partit obert. Evita inscripcions duplicades
     * amb la clau única (match_id, user_id).
     */
    public function up(): void
    {
        Schema::create('match_participants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('match_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->unique(['match_id', 'user_id']);
            $table->timestamps();
        });
    }

    /**
     * Elimina la taula 'match_participants'.
     */
    public function down(): void
    {
        Schema::dropIfExists('match_participants');
    }
};
