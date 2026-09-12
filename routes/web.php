<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\StoreCommentController;
use App\Http\Controllers\ToggleLikeController;
use App\Http\Controllers\VerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::get('/', LandingController::class)->name('home');

Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::post('/password/forgot', [AuthController::class, 'forgot'])->name('password.forgot');
Route::post('/password/reset', [AuthController::class, 'resetPassword'])->name('password.reset');

Route::get('/auth/google', [GoogleAuthController::class, 'redirect'])->name('auth.google');
Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback'])->name('auth.google.callback');

Route::post('/email/verification-notification', [VerifyEmailController::class, 'resend'])
    ->middleware('throttle:6,1')->name('verification.send');

Route::get('/email/verify/{id}/{hash}', VerifyEmailController::class)
    ->name('verification.verify');

Route::get('/news', [NewsController::class, 'index'])->name('news');

Route::get('/news/quotes/{quote}', [NewsController::class, 'show'])->name('news.quotes.show');
Route::put('/news/quotes/{quote}', [NewsController::class, 'update'])->name('news.quotes.update');
Route::delete('/news/quotes/{quote}', [NewsController::class, 'destroy'])->name('news.quotes.destroy');
Route::post('/news/quotes', [NewsController::class, 'store'])->name('news.quotes.store');
Route::post('/news/quotes/{quote}/comments', [StoreCommentController::class, 'storeComment'])->name('quotes.comments.store');
Route::post('/news/quotes/{quote}/like', ToggleLikeController::class)->name('quotes.like.toggle');

Route::get('/movies', [MovieController::class, 'index'])->name('movies');
Route::post('/movies', [MovieController::class, 'store'])->name('movies.store');
