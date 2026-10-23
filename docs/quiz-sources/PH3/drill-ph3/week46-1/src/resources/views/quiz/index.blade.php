@extends('layouts.app')

@section('content')
<div class="flex flex-col max-w-3xl mx-auto">
    hi, there
</div>

<script>
'use strict';
{
  const studyHoursPost = "{{ json_encode($studyHoursPosts) }}";
  console.log(studyHoursPost);
}
</script>
@endsection