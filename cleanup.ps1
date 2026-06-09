Set-Location "c:\Users\inves\Downloads\growth-nexus-saa-s-landing"
Remove-Item next.config.mjs -ErrorAction Ignore
git add .
git commit -m "fix: remove conflicting next.config.mjs"
git push origin main
Write-Host "Cleanup complete"
