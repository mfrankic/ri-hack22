<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\ContainerImport;
use App\Models\Container;
use App\Models\Grid;

class GetContainers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:name';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $csvFile = file(public_path() . '\lokacije-kontejnera.csv');
        foreach ($csvFile as $line) {
            $data[] = str_getcsv($line, ";");
        }

        foreach($data as $index => $item) {
            if ($index == 0 || $item[15] === null || $item[14] === null || $item[11] == null) continue;

            $lat = floatval(str_replace(',', '.', $item[15]));
            $long = floatval(str_replace(',', '.', $item[14]));
            $type = str_replace( '�', 'Š', $item[11]);

            $grid = Grid::whereRaw($lat . " BETWEEN lat_min AND lat_max")
                        ->whereRaw($long . " BETWEEN long_min AND long_max")
                        ->first();

            if ($grid === null) continue;

            Container::create([
                'type' => $type,
                'lat' => $lat,
                'lon' => $long,
                'grid_id' => $grid->id,
            ]);

        }
    }
}
