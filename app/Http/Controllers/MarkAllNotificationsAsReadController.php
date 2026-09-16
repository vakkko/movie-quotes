<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MarkAllNotificationsAsReadController extends Controller
{
    public function __invoke(Request $request)
    {
        if (! Auth::check()) {
            abort(403);
        }

        Auth::user()->notifications()
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return response()->json(['updated' => true]);
    }
}
