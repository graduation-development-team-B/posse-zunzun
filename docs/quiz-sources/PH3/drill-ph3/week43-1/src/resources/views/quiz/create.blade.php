@extends('layouts.app')

@section('content')
    <div class="flex flex-col max-w-3xl mx-auto">
        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <form action="{{ route('quizzes.store') }}" method="post">
            @csrf

            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="file">Upload
                file</label>
            <input
                class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="" id="user_avatar" type="file" name="image_file">
            <div class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file">
                画像をあげてね</div>
            <button type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload</button>
        </form>
    </div>
@endsection
