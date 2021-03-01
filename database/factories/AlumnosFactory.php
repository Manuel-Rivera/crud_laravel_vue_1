<?php

namespace Database\Factories;

use App\Models\Alumnos;
use Illuminate\Database\Eloquent\Factories\Factory;

class AlumnosFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Alumnos::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'matricula'=>$this->faker->numberBetween(1,999999),
            'nombre'=>$this->faker->firstName($gender = 'male'|'female'),
            'apma'=>$this->faker->lastName(),
            'appa'=>$this->faker->lastName(),
            'edad'=>$this->faker->numberBetween(1,99)
        ];
    }
}
