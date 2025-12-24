$files = Get-ChildItem -Path $env:TEMP -Filter 'next-panic-*.log' -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending
if ($files -and $files.Count -gt 0) {
    $log = $files[0]
    Write-Host "== Last panic log: $($log.FullName) -- tail 400 lines =="
    Get-Content $log.FullName -Tail 400
} else {
    Write-Host "No panic log found under $env:TEMP\next-panic-*.log"
}
