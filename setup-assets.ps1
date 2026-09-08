# Portfolio Asset Setup
# Copies images from Project resources into the portfolio folder for offline use.

$srcBase = "$env:USERPROFILE\Desktop\Project resources\temo\important 1"
$destBase = "$PSScriptRoot\assets\projects"

$projects = @(
    @{ folder = "1 huawei"; slug = "huawei" },
    @{ folder = "2 waqep"; slug = "waqep" },
    @{ folder = "3 amlak"; slug = "amlak" },
    @{ folder = "4 stc pay"; slug = "stc-pay" },
    @{ folder = "5 sukarah"; slug = "sukarah" },
    @{ folder = "6 danikin"; slug = "danikin" },
    @{ folder = "7  stc bank"; slug = "stc-bank" },
    @{ folder = "8  elm"; slug = "elm" },
    @{ folder = "9 unity"; slug = "unity" },
    @{ folder = "10 valorant"; slug = "valorant" },
    @{ folder = "11  shatana"; slug = "shatana" }
)

foreach ($p in $projects) {
    $src = Join-Path $srcBase $p.folder
    $dest = Join-Path $destBase $p.slug
    New-Item -ItemType Directory -Force -Path $dest | Out-Null

    $imgs = Get-ChildItem $src -Recurse -Include *.jpg,*.JPG -File | Sort-Object Name
    $i = 1
    foreach ($img in ($imgs | Select-Object -First 8)) {
        Copy-Item $img.FullName (Join-Path $dest "$i.jpg") -Force
        $i++
    }
    Write-Host "Copied $($i - 1) images for $($p.slug)"
}

Copy-Item "$env:USERPROFILE\Desktop\Project resources\temo\WhatsApp Image 2024-05-06 at 14.35.47_4570bbf9.jpg" "$PSScriptRoot\assets\profile\mustafa.jpg" -Force
Write-Host "Done! Open index.html in your browser."
