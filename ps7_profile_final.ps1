<#
    PowerShell 7 Profile - Zsh-like Experience
    Features: Syntax highlighting, Auto Suggestion, Autocomplete, History Substring Search
#>

# --- 1. Modules ---

# Icons (Standard for "Enjoyable" terminals)
if (Get-Module -ListAvailable Terminal-Icons) { Import-Module Terminal-Icons }

# Autocomplete (The "Plugin" part of suggestions)
if (-not (Get-Module -ListAvailable CompletionPredictor)) {
    Write-Host "Installing Autocomplete module..." -ForegroundColor Yellow
    Install-Module CompletionPredictor -Scope CurrentUser -Force
}
# ADB Autocomplete (Manual Definition)
Register-ArgumentCompleter -Native -CommandName adb -ScriptBlock {
    param($wordToComplete, $commandAst, $cursorPosition)
    $commands = 'devices', 'install', 'uninstall', 'logcat', 'shell', 'push', 'pull', 'reboot', 'connect', 'disconnect', 'start-server', 'kill-server', 'tcpip'
    $commands | Where-Object { $_ -like "$wordToComplete*" } | ForEach-Object {
        [System.Management.Automation.CompletionResult]::new($_, $_, 'ParameterValue', $_)
    }
}

Import-Module CompletionPredictor

# Git Status & Autocomplete (posh-git)
if (-not (Get-Module -ListAvailable posh-git)) {
    Write-Host "Installing posh-git (Git Intelligence)..." -ForegroundColor Yellow
    Install-Module posh-git -Scope CurrentUser -Force
}
Import-Module posh-git

# Core Engine
Import-Module PSReadLine

# Theme (Oh My Posh)
if (Get-Command oh-my-posh -ErrorAction SilentlyContinue) {
    try {
        # Fallback to URL since local file wasn't found
        oh-my-posh init pwsh --config 'https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/main/themes/robbyrussell.omp.json' | Invoke-Expression
    } catch {
        oh-my-posh init pwsh | Invoke-Expression
    }
}

# --- 2. Configuration ---

# A. Auto Suggestion & Autocomplete
# Start with InlineView (Shadow text), but let user press F2 to toggle List
Set-PSReadLineOption -PredictionSource HistoryAndPlugin
Set-PSReadLineOption -PredictionViewStyle InlineView
Set-PSReadLineKeyHandler -Key F2 -Function SwitchPredictionView

# B. Syntax Highlighting (Using brighter colors to ensure visibility)
Set-PSReadLineOption -Colors @{
    Command            = 'Green'    # Bright Green
    Parameter          = 'Gray'     # Bright Gray
    Operator           = 'Gray'
    Variable           = 'DarkGreen'
    String             = 'Yellow'   # Bright Yellow
    Number             = 'Yellow'
    Type               = 'Gray'
    Comment            = 'DarkGreen'
    Error              = 'Red'
    InlinePrediction   = 'DarkGray' # The "Shadow" text
}

# C. History Substring Search
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward

# D. Tab Utilities & Autocomplete
Set-PSReadLineOption -ShowToolTips
Set-PSReadLineOption -BellStyle None
Set-PSReadLineKeyHandler -Key Tab -Function MenuComplete

Write-Host "Terminal Configured Successfully!" -ForegroundColor Cyan
Write-Host "  - F2: Toggle between 'Shadow Text' and 'List View'" -ForegroundColor Gray
Write-Host "  - Tab: Autocomplete Menu" -ForegroundColor Gray
Write-Host "  - Up/Down: Search History" -ForegroundColor Gray
