<?php

namespace App\Observers;

use App\Models\Manager\Project;
use App\Models\Manager\ProjectHistory;
use Illuminate\Support\Facades\Log;

class ProjectObserver
{
    /**
     * Handle the Project "created" event.
     *
     * @param  \App\Models\Project  $project
     * @return void
     */
    public function created(Project $project)
    {
        //
    }

    /**
     * Handle the Project "updated" event.
     *
     * @param  \App\Models\Project  $project
     * @return void
     */
    public function updating(Project $project)
    {
        $changes = "";
        $originalProject = $project->getOriginal();

        foreach ($originalProject as $key => $value) {
            if ($originalProject[$key] != $project->$key) {
                $changes .= "> Updated " . $key . ". Old value: " . $originalProject[$key] . " New value: " . $project->$key . "\r\n";
            }
        }

        ProjectHistory::create([
            'project_id' => $project->id,
            'details' => $changes
        ]);
    }

    /**
     * Handle the Project "deleted" event.
     *
     * @param  \App\Models\Project  $project
     * @return void
     */
    public function deleted(Project $project)
    {
        //
    }

    /**
     * Handle the Project "restored" event.
     *
     * @param  \App\Models\Project  $project
     * @return void
     */
    public function restored(Project $project)
    {
        //
    }

    /**
     * Handle the Project "force deleted" event.
     *
     * @param  \App\Models\Project  $project
     * @return void
     */
    public function forceDeleted(Project $project)
    {
        //
    }
}
