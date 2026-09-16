---
paths:
  - 'resources/js/pages/Landing/components/Header/components/Auth/**'
---

# Auth

## Auth register form uses useForm with AuthInputField controlled inputs
RegisterContent collects data with Inertia's useForm (fields: username, email, password, password_confirmation) and posts to the named `register` route (AuthController@register → StoreRegisterRequest). AuthInputField is a controlled input: it requires `value`, `onChange(value)`, and optional `error` props; the eye toggle only applies when hasEyeIcon. Client-side validation runs on submit in RegisterContent (lowercase 3-15 username, email format, lowercase 8-15 password, password match); server errors appear via useForm `errors`. UI strings go through `t()` and lang/*.php keys.

## Register form logic extracted to hook + pure validation module
RegisterContent is presentational only. Form data/validation state lives in useRegisterForm (useForm + clientErrors + submit), and pure, unit-testable validators live in registerValidation.ts (RegisterForm type, initialForm, validateField, validateForm) with keys consumed via t(). Field metadata (labels, placeholders, autoComplete) is a config array in RegisterContent rendered via AuthInputField map.
