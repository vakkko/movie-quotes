<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('movies', function (Blueprint $table) {
            $table->json('title')->nullable()->after('image_url');
            $table->json('description')->nullable()->after('title');
            $table->json('director')->nullable()->after('genre');
        });

        Schema::table('quotes', function (Blueprint $table) {
            $table->json('quote')->nullable()->after('image_url');
        });

        $this->mergeMovieTranslations();
        $this->mergeQuoteTranslations();

        Schema::table('movies', function (Blueprint $table) {
            $table->dropColumn(['title_en', 'title_ka', 'description_en', 'description_ka', 'director_en', 'director_ka']);
        });

        Schema::table('quotes', function (Blueprint $table) {
            $table->dropColumn(['quote_en', 'quote_ka']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('quotes', function (Blueprint $table) {
            $table->text('quote_en');
            $table->text('quote_ka');
        });

        Schema::table('movies', function (Blueprint $table) {
            $table->string('title_en');
            $table->string('title_ka');
            $table->text('description_en')->nullable();
            $table->text('description_ka')->nullable();
            $table->string('director_en');
            $table->string('director_ka');
        });

        $this->splitMovieTranslations();
        $this->splitQuoteTranslations();

        Schema::table('movies', function (Blueprint $table) {
            $table->dropColumn(['title', 'description', 'director']);
        });

        Schema::table('quotes', function (Blueprint $table) {
            $table->dropColumn(['quote']);
        });
    }

    private function mergeMovieTranslations(): void
    {
        DB::table('movies')->orderBy('id')->each(function (stdClass $movie): void {
            DB::table('movies')->where('id', $movie->id)->update([
                'title' => $this->encodeTranslations(['en' => $movie->title_en, 'ka' => $movie->title_ka]),
                'description' => $this->encodeTranslations(['en' => $movie->description_en, 'ka' => $movie->description_ka]),
                'director' => $this->encodeTranslations(['en' => $movie->director_en, 'ka' => $movie->director_ka]),
            ]);
        });
    }

    private function mergeQuoteTranslations(): void
    {
        DB::table('quotes')->orderBy('id')->each(function (stdClass $quote): void {
            DB::table('quotes')->where('id', $quote->id)->update([
                'quote' => $this->encodeTranslations(['en' => $quote->quote_en, 'ka' => $quote->quote_ka]),
            ]);
        });
    }

    private function splitMovieTranslations(): void
    {
        DB::table('movies')->orderBy('id')->each(function (stdClass $movie): void {
            $title = $this->decodeTranslations($movie->title);
            $description = $this->decodeTranslations($movie->description);
            $director = $this->decodeTranslations($movie->director);

            DB::table('movies')->where('id', $movie->id)->update([
                'title_en' => $title['en'] ?? null,
                'title_ka' => $title['ka'] ?? null,
                'description_en' => $description['en'] ?? null,
                'description_ka' => $description['ka'] ?? null,
                'director_en' => $director['en'] ?? null,
                'director_ka' => $director['ka'] ?? null,
            ]);
        });
    }

    private function splitQuoteTranslations(): void
    {
        DB::table('quotes')->orderBy('id')->each(function (stdClass $quote): void {
            $text = $this->decodeTranslations($quote->quote);

            DB::table('quotes')->where('id', $quote->id)->update([
                'quote_en' => $text['en'] ?? null,
                'quote_ka' => $text['ka'] ?? null,
            ]);
        });
    }

    /**
     * @param  array<string, string|null>  $translations
     */
    private function encodeTranslations(array $translations): string
    {
        return json_encode(array_filter($translations, fn ($value) => $value !== null), JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }

    /**
     * @return array<string, string|null>
     */
    private function decodeTranslations(?string $json): array
    {
        return is_string($json) && $json !== ''
            ? (array) json_decode($json, true, 512, JSON_THROW_ON_ERROR)
            : [];
    }
};
