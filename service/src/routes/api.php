<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/prova', function () {
    return response()->json(['message' => 'La connexió funciona correctament!']);
});

// Ruta per obtenir les dades de l'usuari autenticat
//Route::get('/user', function (Request $request) {
   // return $request->user();
//})->middleware('auth:sanctum');

// Rutes d'autenticació (públiques)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Grup de rutes que requereixen autenticació prèvia
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});
