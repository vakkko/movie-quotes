<?php

use App\Models\Quote;
use App\Models\User;
use App\Policies\QuotePolicy;

test('allows the owner to view update and delete their quote', function () {
    $owner = new User;
    $owner->id = 1;

    $policy = new QuotePolicy;

    expect($policy->view($owner, new Quote(['user_id' => 1])))->toBeTrue()
        ->and($policy->update($owner, new Quote(['user_id' => 1])))->toBeTrue()
        ->and($policy->delete($owner, new Quote(['user_id' => 1])))->toBeTrue();
});

test('forbids another user from viewing updating or deleting the quote', function () {
    $other = new User;
    $other->id = 2;

    $policy = new QuotePolicy;

    expect($policy->view($other, new Quote(['user_id' => 1])))->toBeFalse()
        ->and($policy->update($other, new Quote(['user_id' => 1])))->toBeFalse()
        ->and($policy->delete($other, new Quote(['user_id' => 1])))->toBeFalse();
});
