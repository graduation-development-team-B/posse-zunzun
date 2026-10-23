<?php
declare(strict_types=1);
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;

class HomeController extends Controller
{
    /**
     * トップページ
     */
    public function index(Request $request)
    {
        $users = User::where('generation', 1)->get();
        $now = Carbon::now();
        // dd($this->incrementNumber(null));
        dd($this->incrementNumber(1));
        return view('home', compact('users', 'now'));
    }

    public function post()
    {
        $users = User::all();
        return view('home', compact('users'));
    }

    public function someText2(?string $value): string
    {
        if (is_null($value)) {
            return '';
        }

        return 'some' . $value;
    }
}
