<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('grids', function (Blueprint $table) {
            $table->id();
            $table->integer('population');
            $table->float('long_max', $precision = 16 , $scale = 13);
            $table->float('lat_max', $precision = 16 , $scale = 13);
            $table->float('long_min', $precision = 16 , $scale = 13);
            $table->float('lat_min', $precision = 16 , $scale = 13);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('grids');
    }
};
