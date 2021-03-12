<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Manager\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Project::all()->load(['team']));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $project = Project::create([
            'name' => $request->name,
            'description' => $request->description,
            'team_id' => $request->team,
            'start_date' => $request->start_date,
            'finish_date' => $request->finish_date
        ]);
        return response()->json($project);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Manager\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $project = Project::find($id)->load([
            'team', 'history'
        ]);
        $amount = $project->tasks()->count();
        $project->amount = $amount;

        // return response()->json([$project, 'amount' => $amount]);
        return response()->json($project);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Manager\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Project $project)
    {
        $project = Project::findOrFail($request->id);
        $project->update([
            'name' => $request->name,
            'description' => $request->description,
            'team_id' => $request->team,
            'start_date' => $request->start_date,
            'finish_date' => $request->finish_date
        ]);
        return response()->json($project);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Manager\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project)
    {
        //
    }

    public function userProjects()
    {
        $projects = Project::whereHas('team', function ($q) {
            $q->whereHas('members', function ($q2) {
                $q2->where('user_id', Auth::user()->id);
            });
        })
            ->get();

        return response()->json($projects);
    }
}
