Add-Type -AssemblyName System.Drawing

$srcPath = 'D:\projects\memasevich.github.io\public\mascot\mascot-m.png'
$src = [System.Drawing.Bitmap]::FromFile($srcPath)

# 128x128 for SVG base64
$bmp128 = New-Object System.Drawing.Bitmap 128, 128
$g128 = [System.Drawing.Graphics]::FromImage($bmp128)
$g128.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g128.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g128.DrawImage($src, 0, 0, 128, 128)
$ms128 = New-Object System.IO.MemoryStream
$bmp128.Save($ms128, [System.Drawing.Imaging.ImageFormat]::Png)
$b64 = [Convert]::ToBase64String($ms128.ToArray())

$svgContent = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <image href="data:image/png;base64,$b64" width="128" height="128" />
</svg>
"@

[System.IO.File]::WriteAllText('D:\projects\memasevich.github.io\public\favicon.svg', $svgContent)
Write-Output "favicon.svg updated!"

# 32x32 for favicon.ico
$bmp32 = New-Object System.Drawing.Bitmap 32, 32
$g32 = [System.Drawing.Graphics]::FromImage($bmp32)
$g32.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g32.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g32.DrawImage($src, 0, 0, 32, 32)
$iconHandle = $bmp32.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($iconHandle)
$fs = New-Object System.IO.FileStream 'D:\projects\memasevich.github.io\public\favicon.ico', ([System.IO.FileMode]::Create)
$icon.Save($fs)
$fs.Close()

$src.Dispose()
$bmp128.Dispose()
$bmp32.Dispose()
Write-Output "favicon.ico created successfully!"
