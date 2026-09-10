<?php

namespace App\Http\Requests\Traits;

use Illuminate\Validation\Rules\Password;

trait PasswordRules
{
    /**
     * @return array<int, mixed>
     */
    protected function passwordRules(): array
    {
        return [
            'required',
            'string',
            Password::min(8)->max(15)->letters(),
            'regex:/^[a-z]+$/',
            'confirmed',
        ];
    }
}
