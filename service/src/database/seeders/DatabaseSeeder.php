<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Insereix les dades inicials de prova per a totes les taules del sistema.
     * Crea rols, usuaris, clubs, franges horàries, pistes, reserves i partits
     * oberts per poder testejar l'aplicació des del primer moment.
     */
    public function run(): void
    {
        // 1. Rols base del sistema
        DB::table('roles')->insert([
            ['name' => 'player'],
            ['name' => 'owner'],
        ]);

        // 2. Usuaris de prova (2 owners, 3 players)
        DB::table('users')->insert([
            'name' => 'Pere',
            'email' => 'pere@gmail.com',
            'password' => bcrypt('password'),
            'role_id' => 2,
            'email_verified_at' => now(),
        ]);
        DB::table('users')->insert([
            'name' => 'Maria',
            'email' => 'maria@gmail.com',
            'password' => bcrypt('password'),
            'role_id' => 2,
            'email_verified_at' => now(),
        ]);
        DB::table('users')->insert([
            'name' => 'Rafel',
            'email' => 'rafel@gmail.com',
            'password' => bcrypt('password'),
            'role_id' => 1,
            'email_verified_at' => now(),
        ]);
        DB::table('users')->insert([
            'name' => 'Laia',
            'email' => 'laia@gmail.com',
            'password' => bcrypt('password'),
            'role_id' => 1,
            'email_verified_at' => now(),
        ]);
        DB::table('users')->insert([
            'name' => 'Joan',
            'email' => 'joan@gmail.com',
            'password' => bcrypt('password'),
            'role_id' => 1,
            'email_verified_at' => now(),
        ]);

        // 3. Clubs
        DB::table('clubs')->insert([
            'name' => 'Club Pàdel Palma',
            'address' => 'C/ dels Esports, 1, Palma',
            'phone' => '971123456',
            'owner_id' => 1,
        ]);
        DB::table('clubs')->insert([
            'name' => 'Club Pàdel Inca',
            'address' => 'Av. de la Constitució, 25, Inca',
            'phone' => '971654321',
            'owner_id' => 2,
        ]);

        // 4. Membres dels clubs
        DB::table('club_members')->insert([
            ['user_id' => 3, 'club_id' => 1], // Rafel → Palma
            ['user_id' => 4, 'club_id' => 1], // Laia  → Palma
            ['user_id' => 4, 'club_id' => 2], // Laia  → Inca
        ]);

        // 5. Franges horàries (dilluns a dissabte, cada hora)
        $hours = ['10:00', '11:00', '12:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
        $slots = [];

        foreach ([1, 2] as $clubId) {
            foreach (range(1, 6) as $day) {
                foreach ($hours as $start) {
                    $slots[] = [
                        'club_id' => $clubId,
                        'day_of_week' => $day,
                        'start_time' => $start,
                        'end_time' => Carbon::parse($start)->addHour()->format('H:i'),
                    ];
                }
            }
        }
        DB::table('time_slots')->insert($slots);

        // 6. Pistes dels clubs
        DB::table('courts')->insert([
            ['club_id' => 1, 'name' => 'Pista 1'],
            ['club_id' => 1, 'name' => 'Pista 2'],
            ['club_id' => 2, 'name' => 'Pista 1'],
            ['club_id' => 2, 'name' => 'Pista 2'],
        ]);

        // 7. Reserves de prova
        $tomorrow = Carbon::tomorrow()->toDateString();

        DB::table('bookings')->insert([
            'court_id' => 1,
            'user_id' => 3,
            'match_date' => $tomorrow,
            'time_slot_id' => 1, // Palma, dilluns 10:00
        ]);
        DB::table('bookings')->insert([
            'court_id' => 3,
            'user_id' => 4,
            'match_date' => $tomorrow,
            'time_slot_id' => 49, // Inca, dilluns 10:00
        ]);
        DB::table('bookings')->insert([
            'court_id' => 2,
            'user_id' => 1,
            'match_date' => $tomorrow,
            'time_slot_id' => 2, // Palma, dilluns 11:00
        ]);

        // 8. Partits oberts a partir de les reserves
        DB::table('matches')->insert([
            'booking_id' => 1,
            'creator_id' => 3,
            'max_players' => 4,
        ]);
        DB::table('matches')->insert([
            'booking_id' => 2,
            'creator_id' => 4,
            'max_players' => 4,
        ]);

        // 9. Inscripcions als partits
        DB::table('match_participants')->insert([
            ['match_id' => 1, 'user_id' => 1], // Pere apuntat al partit de Rafel
            ['match_id' => 2, 'user_id' => 3], // Rafel apuntat al partit de Laia
        ]);
    }
}
