<?php

namespace App\Http\Controllers;

use App\Models\Club;
use Illuminate\Http\JsonResponse;

/**
 * Gestiona les operacions relacionades amb les franges horàries dels clubs.
 */
class TimeSlotController extends Controller
{
    /**
     * Retorna la llista de franges horàries d'un club concret.
     * Retorna 404 si el club no existeix.
     */
    public function index(int $id): JsonResponse
    {
        $club = Club::find($id);

        if (!$club) {
            return response()->json(['message' => 'Club not found'], 404);
        }

        return response()->json($club->timeSlots);
    }
}