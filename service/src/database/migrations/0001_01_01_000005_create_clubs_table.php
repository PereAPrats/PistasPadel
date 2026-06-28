<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Crea la taula 'clubs' per emmagatzemar els clubs de pàdel.
     * Cada club pertany a un usuari propietari (owner).
     */
    public function up(): void
    {
        Schema::create('clubs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('address');
            $table->string('phone');
            $table->foreignId('owner_id')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Elimina la taula 'clubs'.
     */
    public function down(): void
    {
        Schema::dropIfExists('clubs');
    }
};
