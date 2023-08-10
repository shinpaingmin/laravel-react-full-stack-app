<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
  //created signup request class and login request class for data validation separately
    //signup
    public function signup(SignupRequest $request) {
      $data = $request->validated();  //return assoArray

      //store in database
      $user = User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => $data['password'],
      ]);

      //create token
      $token = $user->createToken('main')->plainTextToken;

      //response
      return response(compact('user', 'token')); //must be string inside compact
    }

    //login
    public function login(LoginRequest $request) {
      $credentials = $request->validated();
      if(!Auth::attempt($credentials)) {

        return response([
          'message' => 'Provided email address or password is incorrect'
        ], 422);  //error code
      }

      //retrieving authenticated user instance
      $user = Auth::user();

      //create token
      $token = $user->createToken('main')->plainTextToken;

      //response
      return response(compact('user', 'token'));
    }

     //logout
     public function logout(Request $request) {
      //retrieving user object
      $user = $request->user();

      //delete token
      $user->currentAccessToken()->delete();
     }
}
