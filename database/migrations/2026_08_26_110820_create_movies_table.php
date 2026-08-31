<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title_en');
            $table->string('title_ka');
            $table->string('image_url');
            $table->timestamp('released_at')->nullable();
            $table->string('genre');
            $table->text('description_en')->nullable();
            $table->text('description_ka')->nullable();
            $table->string('director_en');
            $table->string('director_ka');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
