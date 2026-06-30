<?php

namespace App\Http\Controllers;

use App\Models\Club;
use Illuminate\Http\JsonResponse;

/**
 * Gestiona les operacions relacionades amb els clubs de pàdel.
 */
class ClubController extends Controller
{
    /**
     * Retorna la llista de tots els clubs disponibles.
     */
    public function index(): JsonResponse
    {
        $clubs = Club::all();

        return response()->json($clubs);
    }
}