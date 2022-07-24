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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->boolean('accepted');
            $table->boolean('declined');
            $table->boolean('resolved');
            $table->string('type');
            $table->integer('grid_id');
            $table->float('lat', $precision = 16 , $scale = 13);
            $table->float('lon', $precision = 16 , $scale = 13);
            $table->string('image_path');
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
        Schema::dropIfExists('reports');
    }
};
