<?php

namespace App\Http\Requests;

use App\Http\Requests\Traits\PasswordRules;
use Illuminate\Foundation\Http\FormRequest;

class StoreResetPasswordRequest extends FormRequest
{
    use PasswordRules;

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'email', 'exists:users,email'],
            'password' => $this->passwordRules(),
        ];
    }
}
