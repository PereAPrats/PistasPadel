<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Registra un nou usuari a l'aplicació.
     * Valida les dades, crea l'usuari a la BBDD i retorna un token de Sanctum.
     */
    public function register(Request $request)
    {
        // Validació de les dades d'entrada
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        // Creació de l'usuari amb la contrasenya encriptada
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Generació del token d'API amb Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    /**
     * Autentica un usuari existent.
     * Verifica les credencials i, si són correctes, retorna un token.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        // Comprovació de l'existència de l'usuari i la validesa de la contrasenya
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les credencials són incorrectes.'],
            ]);
        }

        // Generació del token per a la sessió iniciada
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    /**
     * Tanca la sessió de l'usuari actual.
     * Elimina el token utilitzat per a la petició actual.
     */
    public function logout(Request $request)
    {
        // currentAccessToken() fa referència al token usat en la petició actual
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Sessió tancada correctament']);
    }
}