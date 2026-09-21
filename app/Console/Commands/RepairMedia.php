<?php

namespace App\Console\Commands;

use App\Models\Movie;
use App\Models\Quote;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Throwable;

#[Signature('media:repair')]
#[Description('Re-download missing movie and quote images from placeholder service')]
class RepairMedia extends Command
{
    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $moviesRepaired = $this->repairCollection(Movie::class, 'poster');
        $quotesRepaired = $this->repairCollection(Quote::class, 'image');

        $this->info(sprintf('Repaired %d movies and %d quotes.', $moviesRepaired, $quotesRepaired));

        return self::SUCCESS;
    }

    /**
     * @template TModel of { getMedia(): \Illuminate\Support\Collection<int, Media> }
     *
     * @param  class-string<TModel>  $modelClass
     */
    private function repairCollection(string $modelClass, string $collection): int
    {
        $repaired = 0;

        foreach ($modelClass::all() as $model) {
            $media = $model->getMedia($collection)->first();

            if ($media !== null && file_exists($media->getPath())) {
                continue;
            }

            $bytes = $this->placeholderBytes($collection.$model->id);

            if ($bytes === null) {
                $this->warn("Could not fetch a placeholder image for {$modelClass} #{$model->id}.");

                continue;
            }

            if ($media !== null) {
                $model->clearMediaCollection($collection);
            }

            $model->addMediaFromString($bytes)
                ->usingFileName($collection.'-'.$model->id.'.jpg')
                ->toMediaCollection($collection);

            $repaired++;
        }

        return $repaired;
    }

    private function placeholderBytes(string $seed): ?string
    {
        try {
            $request = Http::get("https://picsum.photos/seed/{$seed}/800/1200");

            if ($request->successful()) {
                return $request->body();
            }
        } catch (Throwable) {
            // Fall through to the local fixture image.
        }

        $fixture = __DIR__.'/../../../tests/fixtures/test-image.png';

        if (file_exists($fixture)) {
            $bytes = file_get_contents($fixture);

            return $bytes !== false ? $bytes : null;
        }

        return null;
    }
}
