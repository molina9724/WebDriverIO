<#
    PowerShell Ultimate Profile
    Replicates: OhMyZsh + Autosuggestions + Syntax Highlighting + Autocomplete + ADB
#>

# 1. Load Modules
if (Get-Module -ListAvailable Terminal-Icons) {
    Import-Module Terminal-Icons
}

Import-Module PSReadLine

# 2. Set Theme (Oh My Posh)
if (Get-Command oh-my-posh -ErrorAction SilentlyContinue) {
    try {
        oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\robbyrussell.omp.json" | Invoke-Expression
    } catch {
        oh-my-posh init pwsh | Invoke-Expression
    }
} else {
    Write-Warning "Oh My Posh executable not found. Please run 'winget install JanDeDobbeleer.OhMyPosh'"
}

# 3. Configure PSReadLine (The Magic Engine)

# 3a. Predictions and View
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView
# Note: ListView requires a window height of at least 5 lines.

# 3b. Syntax Highlighting Colors (Mac/Zsh Style)
# Added 'Emphasis' (for selection) and 'InlinePrediction'
Set-PSReadLineOption -Colors @{
    Command            = 'DarkGreen'
    Parameter          = 'DarkGray'
    Operator           = 'DarkGray'
    Variable           = 'Green'
    String             = 'DarkYellow'
    Number             = 'DarkYellow'
    Type               = 'Gray'
    Comment            = 'Green'
    Error              = 'Red'
    
    # Prediction Colors
    # 'InlinePrediction' covers the ghost text -> DarkGray
    # 'ListPrediction' covers the unselected items in list -> DarkGray
    # 'ListPredictionSelected' (if supported) or 'Selection' might apply.
    # We will try setting 'Selection' or 'Emphasis' which usually controls highlighting.
    
    # PSReadLine 2.2+ uses 'InlinePrediction' for the suggestion text.
    InlinePrediction   = 'DarkGray'
}

# 3c. List Selection Highlight
# There isn't a direct 'ListPredictionSelected' color key in older PSReadLine versions.
# However, the selected item usually respects the Console 'Inverse' or 'Selection' color.
# We'll rely on default inverted highlighting which usually works best.

Set-PSReadLineOption -ShowToolTips
Set-PSReadLineKeyHandler -Key Tab -Function MenuComplete

# 4. CUSTOM PROMPT (Fallback)
function prompt {
    $path = $pwd.Path
    if ($path.StartsWith($HOME)) {
        $path = $path.Replace($HOME, '~')
    }

    $gitInfo = ""
    if (Get-Command git -ErrorAction SilentlyContinue) {
        if (git rev-parse --is-inside-work-tree 2>$null) {
            $branch = git branch --show-current 2>$null
            if ($branch) {
                $gitInfo = " git:($branch)"
            }
        }
    }

    Write-Host ""
    Write-Host $path -NoNewline -ForegroundColor Cyan
    Write-Host $gitInfo -ForegroundColor DarkGray
    return "PS> "
}

# 5. ADB Completions
Register-ArgumentCompleter -Native -CommandName adb -ScriptBlock {
    param($wordToComplete, $commandAst, $cursorPosition)

    $commands = [Ordered]@{
        'devices'      = 'list connected devices'
        'install'      = 'install package'
        'uninstall'    = 'remove package'
        'logcat'       = 'view device log'
        'push'         = 'copy file/dir to device'
        'pull'         = 'copy file/dir from device'
        'shell'        = 'run remote shell'
        'reboot'       = 'reboot device'
        'connect'      = 'connect to TCP/IP device'
        'disconnect'   = 'disconnect from TCP/IP device'
        'start-server' = 'ensure server is running'
        'kill-server'  = 'kill server if running'
    }

    $inputStr = $commandAst.ToString()
    $tokens = $inputStr.Split(' ', [System.StringSplitOptions]::RemoveEmptyEntries)

    if ($tokens.Count -le 1 -or ($tokens.Count -eq 2 -and -not $inputStr.EndsWith(' '))) {
        return $commands.GetEnumerator() | Where-Object { $_.Key -like "$wordToComplete*" } |
            ForEach-Object { [System.Management.Automation.CompletionResult]::new($_.Key, $_.Key, 'ParameterValue', $_.Value) }
    }

    if ($tokens[1] -in 'install', 'push') {
        return Get-ChildItem -Filter "$wordToComplete*" |
            ForEach-Object {
                $val = $_.Name
                if ($val -match ' ') { $val = "'$val'" }
                [System.Management.Automation.CompletionResult]::new($val, $val, 'ParameterValue', $val)
            }
    }
    return $null
}

Write-Host "Antigravity Configuration Loaded! (Refined Prediction Colors)" -ForegroundColor Green
