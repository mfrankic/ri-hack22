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
        Schema::create('cleansings', function (Blueprint $table) {
            $table->id();
            $table->string('creator_id');
            $table->string('title');
            $table->longText('desc');
            $table->integer('grid_id');
            $table->float('lat', $precision = 16 , $scale = 13);
            $table->float('lon', $precision = 16 , $scale = 13);
            $table->string('image_path');
            $table->boolean('published');
            $table->boolean('declined');
            $table->dateTime('event_time');
            $table->string('location_name');
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
        Schema::dropIfExists('cleansings');
    }
};
