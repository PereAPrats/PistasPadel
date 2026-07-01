<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClubController;
use App\Http\Controllers\CourtController;

Route::get('/clubs', [ClubController::class, 'index']);
Route::get('/clubs/{id}/courts', [CourtController::class, 'index']);