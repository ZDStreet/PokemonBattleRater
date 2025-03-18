<!DOCTYPE html>
<html>
<head>
    <title>Pokemon Battle Rater</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/app.css', 'resources/js/app.ts'])
</head>
<body class="bg-gray-100 p-8" {{ $attributes }}>
    <div class="max-w-6xl mx-auto pb-12">
        {{ $slot }}
    </div>
</body>
</html> 