Get-ChildItem -Path ".\src" -Filter "*.jsx" -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $newContent = $content -replace "import React[^;]*;`n?", ""
    $newContent = $newContent -replace "// eslint-disable-next-line no-unused-vars`n?", ""
    Set-Content $_.FullName $newContent
}
