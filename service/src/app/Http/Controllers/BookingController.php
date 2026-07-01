<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Gestiona les operacions relacionades amb les reserves de pistes.
 */
class BookingController extends Controller
{
    /**
     * Retorna la llista de reserves filtrades per data i/o pista.
     * Els paràmetres date i court_id són opcionals però es recomana
     * passar-los sempre per evitar retornar totes les reserves del sistema.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Booking::query();

        // Filtrar per data si s'ha passat el paràmetre ?date=
        if ($request->has('date')) {
            $query->where('match_date', $request->query('date'));
        }

        // Filtrar per pista si s'ha passat el paràmetre ?court_id=
        if ($request->has('court_id')) {
            $query->where('court_id', $request->query('court_id'));
        }

        return response()->json($query->get());
    }
}