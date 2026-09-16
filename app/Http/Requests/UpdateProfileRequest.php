<?php

namespace App\Http\Requests;

use App\Http\Requests\Traits\ImageRules;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Validator;

class UpdateProfileRequest extends FormRequest
{
    use ImageRules;

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $userId = $this->user()->id;

        return [
            'username' => [
                'nullable',
                'string',
                'min:3',
                'max:15',
                'regex:/^[a-z]+$/',
                "unique:users,username,{$userId}",
            ],
            'email' => [
                'nullable',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($userId),
                Rule::unique('users', 'pending_email')->ignore($userId),
            ],
            'current_password' => ['nullable', 'string'],
            'password' => ['nullable', 'string'],
            'password_confirmation' => ['nullable', 'string'],
            'avatar' => $this->optionalImageRules(),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function withValidator(Validator $validator): void
    {
        $validator->sometimes('current_password', ['required', 'current_password'], fn () => $this->filled('password'));
        $validator->sometimes('password', ['required', 'string', Password::min(8)->max(15)->letters(), 'regex:/^[a-z]+$/', 'confirmed'], fn () => $this->filled('password'));
        $validator->sometimes('password_confirmation', ['required', 'string'], fn () => $this->filled('password'));
    }
}
