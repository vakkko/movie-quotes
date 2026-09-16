<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class MarkAllNotificationsAsReadController extends Controller
{
    public function __invoke()
    {
        Auth::user()->notifications()
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return response()->json(['updated' => true]);
    }
}
