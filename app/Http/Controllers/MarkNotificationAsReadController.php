<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\JsonResponse;

class MarkNotificationAsReadController extends Controller
{
    public function __invoke(Notification $notification): JsonResponse
    {
        $this->authorize('update', $notification);

        if (! $notification->is_read) {
            $notification->update(['is_read' => true]);
        }

        return response()->json(['is_read' => true]);
    }
}
