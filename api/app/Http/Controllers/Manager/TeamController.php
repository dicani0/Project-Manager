<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Manager\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $teams = Team::all()->load('leader')->load('members');
        return response()->json($teams);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $team = Team::create([
            'name' => $request->name,
            'leader_id' => $request->leader
        ]);
        $team->members()->sync($request->members);
        return response()->json($team->load('leader')->load('members'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Manager\Team  $team
     * @return \Illuminate\Http\Response
     */
    public function show(Team $team)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Manager\Team  $team
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Team $team)
    {
        $team = Team::find($request->id);
        $team->update([
            'name' => $request->name,
            'leader_id' => $request->leader
        ]);
        $team->members()->sync($request->members);
        return response()->json($team->load('leader')->load('members'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Manager\Team  $team
     * @return \Illuminate\Http\Response
     */
    public function destroy(Team $team)
    {
        //
    }
}
