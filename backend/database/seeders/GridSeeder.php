<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GridSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $rectangle = [[45.24453880, 14.33205750], [45.4760077, 14.6817417]];
        $latStep = ($rectangle[1][0] - $rectangle[0][0]) / 20;
        $lonStep = ($rectangle[1][1] - $rectangle[0][1]) / 20;

        for ($x = 0; $x < 20; $x++) {
            for ($y = 0; $y < 20; $y++) {
                DB::table('grids')->insert([
                    'population' => rand(100, 10000),
                    'lat_min' => $rectangle[0][0] + $x * $latStep,
                    'lat_max' => $rectangle[0][0] + ($x + 1) * $latStep,
                    'long_min' =>  $rectangle[0][1] + $y * $lonStep,
                    'long_max' =>  $rectangle[0][1] + ($y + 1) * $lonStep,
                ]);
            }
        }

    }
}
