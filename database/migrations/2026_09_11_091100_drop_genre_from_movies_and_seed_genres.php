<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('movies', function (Blueprint $table) {
            $table->json('genre_json')->nullable()->after('released_at');
        });

        $movies = DB::table('movies')
            ->whereNotNull('genre')
            ->where('genre', '!=', '')
            ->get();

        foreach ($movies as $movie) {
            $genreNames = array_values(array_filter(
                array_map('trim', explode(',', $movie->genre)),
                fn (string $name) => $name !== '',
            ));

            DB::table('movies')
                ->where('id', $movie->id)
                ->update(['genre_json' => json_encode($genreNames)]);
        }

        Schema::table('movies', function (Blueprint $table) {
            $table->dropColumn('genre');
        });

        Schema::table('movies', function (Blueprint $table) {
            $table->renameColumn('genre_json', 'genre');
        });
    }

    public function down(): void
    {
        Schema::table('movies', function (Blueprint $table) {
            $table->string('genre_string')->nullable()->after('released_at');
        });

        $movies = DB::table('movies')->whereNotNull('genre')->get();

        foreach ($movies as $movie) {
            $genreNames = json_decode($movie->genre, true);

            if (is_array($genreNames)) {
                DB::table('movies')
                    ->where('id', $movie->id)
                    ->update(['genre_string' => implode(',', $genreNames)]);
            }
        }

        Schema::table('movies', function (Blueprint $table) {
            $table->dropColumn('genre');
        });

        Schema::table('movies', function (Blueprint $table) {
            $table->renameColumn('genre_string', 'genre');
        });
    }
};
