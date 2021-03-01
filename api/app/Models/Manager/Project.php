<?php

namespace App\Models\Manager;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $with = [];

    /**
     * Undocumented function
     *
     * @return gowno
     */

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }
}
