@extends('layouts.app')

@section('content')
<div class="flex flex-col max-w-3xl mx-auto">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <form method="POST" action="{{ route('quiz.up') }}">
          @csrf
          <input type="hidden" name="_method" value="PATCH" />
          <input type="hidden" name="id" id="inputId" />
        </form>
        <table class="min-w-full text-center">
          <thead class="border-b bg-gray-50">
            <tr>
              <th scope="col" width="10" class="text-sm font-medium text-gray-900 px-6 py-4">
                #
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Quiz
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                Up/Down
              </th>
            </tr>
          </thead class="border-b">
          <tbody>
          @foreach ($quizzes as $quizz)
            <tr class="bg-white border-b">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ $quizz->sort_order }}</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-left">
                {{ $quizz->name }}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-1 js-up-button" data-id="{{ $quizz->id }}">↑</button>
                <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded js-down-button">↓</button>
              </td>
            </tr>
          @endforeach
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
<script>
'use strict';
{
  const upToSortNumber = (event) => {
    const quizId = Number(event.currentTarget.getAttribute('data-id'));
    const formElement = document.querySelector('form');

    const inputElementForId = document.getElementById('inputId');
    inputElementForId.value = quizId;
    formElement.submit();
  };

  document.querySelector('.js-up-button').addEventListener('click', upToSortNumber);
}
</script>
@endsection