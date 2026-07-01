<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClubController;
use App\Http\Controllers\CourtController;
use App\Http\Controllers\TimeSlotController;

Route::get('/clubs', [ClubController::class, 'index']);
Route::get('/clubs/{id}/courts', [CourtController::class, 'index']);
Route::get('/clubs/{id}/slots', [TimeSlotController::class, 'index']);