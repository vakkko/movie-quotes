<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class MarkNotificationAsReadController extends Controller
{
    public function __invoke(Notification $notification): JsonResponse
    {
        if ($notification->user_id !== Auth::id()) {
            abort(403);
        }

        if (! $notification->is_read) {
            $notification->update(['is_read' => true]);
        }

        return response()->json(['is_read' => true]);
    }
}
