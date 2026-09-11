<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('movies', function (Blueprint $table) {
            $table->dropColumn('image_url');
        });

        Schema::table('quotes', function (Blueprint $table) {
            $table->dropColumn('image_url');
        });
    }

    public function down(): void
    {
        Schema::table('movies', function (Blueprint $table) {
            $table->string('image_url');
        });

        Schema::table('quotes', function (Blueprint $table) {
            $table->string('image_url');
        });
    }
};
