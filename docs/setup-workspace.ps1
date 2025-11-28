# FG_Docs Workspace Setup Script for Windows
# Automatically configures VS Code workspace for Family Governance Platform
# Designed for non-technical team members on Windows

# Enable strict error handling
$ErrorActionPreference = "Stop"

Write-Host "🚀 Setting up Family Governance Platform Workspace (Windows)..." -ForegroundColor Cyan
Write-Host "=============================================================`n" -ForegroundColor Cyan

# Helper functions for colored output
function Print-Status {
    param($Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Print-Warning {
    param($Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

function Print-Error {
    param($Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

function Print-Info {
    param($Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Blue
}

# Check if we're in the correct directory
if (-not (Test-Path "README.md") -or -not (Select-String -Path "README.md" -Pattern "FG_Docs" -Quiet)) {
    Print-Error "Please run this script from the FG_Docs directory"
    exit 1
}

# Get directories
$CurrentDir = Get-Location
$WorkspaceDir = Split-Path -Parent $CurrentDir

Print-Info "Current directory: $CurrentDir"
Print-Info "Workspace directory: $WorkspaceDir"

# Check if FG repository exists
$FGPath = Join-Path $WorkspaceDir "FG"
if (-not (Test-Path $FGPath)) {
    Print-Warning "FG repository not found at $FGPath"
    Write-Host "Please clone it first:" -ForegroundColor Yellow
    Write-Host "cd `"$WorkspaceDir`" && git clone https://github.com/Reluna-Family/FG.git" -ForegroundColor Yellow

    $response = Read-Host "`nDo you want to clone it now? (y/n)"
    if ($response -eq 'y' -or $response -eq 'Y') {
        Set-Location $WorkspaceDir
        git clone https://github.com/Reluna-Family/FG.git
        Print-Status "FG repository cloned successfully"
        Set-Location $CurrentDir
    } else {
        Print-Error "FG repository is required. Exiting."
        exit 1
    }
}

# Create workspace file
Print-Info "Creating VS Code workspace configuration..."

$WorkspaceFilePath = Join-Path $WorkspaceDir "FG-Complete-Workspace.code-workspace"

$WorkspaceContent = @'
{
  "folders": [
    {
      "name": "📚 FG Documentation & PM",
      "path": "./FG_Docs"
    },
    {
      "name": "🏠 FG Root",
      "path": "./FG"
    },
    {
      "name": "🚀 Turbo Stack",
      "path": "./FG/turbo"
    },
    {
      "name": "🔧 Backend Services",
      "path": "./FG/backend"
    },
    {
      "name": "⚛️ Frontend React App",
      "path": "./FG/frontend/react-app"
    },
    {
      "name": "👨‍💼 Admin Portal",
      "path": "./FG/frontend/admin-portal"
    },
    {
      "name": "🤝 Advisor Portal",
      "path": "./FG/frontend/advisor-portal"
    }
  ],
  "settings": {
    "git.defaultBranchName": "main",
    "files.exclude": {
      "**/node_modules": true,
      "**/.git": false,
      "**/dist": true,
      "**/build": true,
      "**/.DS_Store": true,
      "**/__pycache__": true,
      "**/.pytest_cache": true,
      "**/.ruff_cache": true,
      "**/.turbo": true,
      "**/.next": true
    },
    "search.exclude": {
      "**/node_modules": true,
      "**/dist": true,
      "**/build": true,
      "**/.turbo": true,
      "**/.next": true
    },
    "markdown.preview.theme": "GitHub",
    "markdown.preview.fontSize": 14,
    "workbench.tree.indent": 20,
    "workbench.colorTheme": "GitHub Light Default",
    "editor.wordWrap": "on",
    "editor.fontSize": 14,
    "explorer.confirmDelete": false,
    "files.autoSave": "afterDelay",
    "git.autofetch": true,
    "terminal.integrated.defaultProfile.windows": "Git Bash"
  },
  "extensions": {
    "recommendations": [
      "yzhang.markdown-all-in-one",
      "shd101wyy.markdown-preview-enhanced",
      "davidanson.vscode-markdownlint",
      "ms-vscode.vscode-json",
      "eamodio.gitlens",
      "gruntfuggly.todo-tree",
      "streetsidesoftware.code-spell-checker",
      "jebbs.plantuml",
      "ms-vscode.vscode-github-issue-notebooks",
      "github.vscode-pull-request-github",
      "ms-vscode.live-server"
    ]
  },
  "tasks": {
    "version": "2.0.0",
    "tasks": [
      {
        "label": "📝 Create New Epic",
        "type": "shell",
        "command": "Copy-Item",
        "args": [
          "templates/epic-template.md",
          "project-management/epics/epic-new.md"
        ],
        "options": {
          "cwd": "${workspaceFolder:📚 FG Documentation & PM}",
          "shell": {
            "executable": "powershell.exe",
            "args": ["-Command"]
          }
        },
        "group": "build",
        "presentation": {
          "reveal": "always"
        }
      },
      {
        "label": "📋 Create Sprint Report",
        "type": "shell",
        "command": "Copy-Item",
        "args": [
          "templates/sprint-template.md",
          "project-management/sprints/sprint-$(Get-Date -Format 'yyyy-MM-dd').md"
        ],
        "options": {
          "cwd": "${workspaceFolder:📚 FG Documentation & PM}",
          "shell": {
            "executable": "powershell.exe",
            "args": ["-Command"]
          }
        },
        "group": "build"
      },
      {
        "label": "🚀 Start Development Stack",
        "type": "shell",
        "command": "./start-local-dev.sh",
        "options": {
          "cwd": "${workspaceFolder:🏠 FG Root}",
          "shell": {
            "executable": "bash.exe"
          }
        },
        "group": "build",
        "presentation": {
          "reveal": "always",
          "panel": "new"
        }
      },
      {
        "label": "🛑 Stop Development Stack",
        "type": "shell",
        "command": "docker-compose -f docker-compose.yml -f docker-compose.local.yml down",
        "options": {
          "cwd": "${workspaceFolder:🏠 FG Root}"
        },
        "group": "build"
      }
    ]
  }
}
'@

Set-Content -Path $WorkspaceFilePath -Value $WorkspaceContent -Encoding UTF8
Print-Status "Workspace configuration created: $WorkspaceFilePath"

# Create basic directory structure
Print-Info "Setting up directory structure..."

$directories = @(
    "business-docs\requirements",
    "business-docs\user-guides",
    "business-docs\processes",
    "business-docs\glossary",
    "reports\sprint-reports",
    "reports\metrics",
    "reports\stakeholder-updates",
    "scripts\templates",
    "templates"
)

foreach ($dir in $directories) {
    $fullPath = Join-Path $CurrentDir $dir
    if (-not (Test-Path $fullPath)) {
        New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
    }
}

Print-Status "Directory structure created"

# Create essential template files
Print-Info "Creating template files..."

# Epic template
$EpicTemplate = @'
---
epic_id: "EPIC-XXX"
title: "Epic Title"
status: "planning"
priority: "high"
start_date: "YYYY-MM-DD"
target_date: "YYYY-MM-DD"
owner: "@username"
stakeholders: ["@user1", "@user2"]
---

# EPIC-XXX: Epic Title

## 📋 Epic Summary
Brief description of the epic and its business value.

## 🎯 Business Objectives
- Objective 1
- Objective 2
- Objective 3

## 👥 User Stories
- [ ] **Story 1** - As a [user type], I want [functionality] so that [benefit]
- [ ] **Story 2** - As a [user type], I want [functionality] so that [benefit]
- [ ] **Story 3** - As a [user type], I want [functionality] so that [benefit]

## ✅ Acceptance Criteria
- [ ] Criteria 1
- [ ] Criteria 2
- [ ] Criteria 3

## 📊 Success Metrics
- Metric 1: Target value
- Metric 2: Target value
- Metric 3: Target value

## 🔗 Dependencies
- Dependency 1
- Dependency 2

## 📝 Notes
Additional context, assumptions, or constraints.
'@

$epicTemplatePath = Join-Path $CurrentDir "templates\epic-template.md"
if (-not (Test-Path $epicTemplatePath)) {
    Set-Content -Path $epicTemplatePath -Value $EpicTemplate -Encoding UTF8
}

# Sprint template
$SprintTemplate = @'
---
sprint_number: "XX"
start_date: "YYYY-MM-DD"
end_date: "YYYY-MM-DD"
sprint_goal: "Sprint goal description"
team: "Team Name"
---

# Sprint XX Report

## 🎯 Sprint Goal
Description of what we aimed to achieve this sprint.

## 📊 Sprint Metrics
- **Planned Stories:** X
- **Completed Stories:** X
- **Story Points Planned:** X
- **Story Points Completed:** X
- **Velocity:** X

## ✅ Completed Stories
- [ ] Story 1 - Description
- [ ] Story 2 - Description
- [ ] Story 3 - Description

## 🚫 Incomplete Stories
- [ ] Story 4 - Description (Reason: ...)
- [ ] Story 5 - Description (Reason: ...)

## 🎉 Achievements
- Achievement 1
- Achievement 2
- Achievement 3

## 🚧 Blockers & Challenges
- Blocker 1 - Resolution
- Blocker 2 - Resolution

## 📝 Retrospective Notes
### What went well?
- Item 1
- Item 2

### What could be improved?
- Item 1
- Item 2

### Action items for next sprint
- [ ] Action 1
- [ ] Action 2
'@

$sprintTemplatePath = Join-Path $CurrentDir "templates\sprint-template.md"
if (-not (Test-Path $sprintTemplatePath)) {
    Set-Content -Path $sprintTemplatePath -Value $SprintTemplate -Encoding UTF8
}

Print-Status "Template files created"

# Check if VS Code is installed
$codeCommand = Get-Command code -ErrorAction SilentlyContinue
if ($codeCommand) {
    Print-Info "VS Code detected. Installing recommended extensions..."

    # Install extensions silently
    $extensions = @(
        "yzhang.markdown-all-in-one",
        "davidanson.vscode-markdownlint",
        "eamodio.gitlens",
        "gruntfuggly.todo-tree",
        "streetsidesoftware.code-spell-checker"
    )

    foreach ($ext in $extensions) {
        try {
            code --install-extension $ext --force 2>&1 | Out-Null
        } catch {
            # Silent fail - extension might already be installed
        }
    }

    Print-Status "VS Code extensions installed"

    # Ask if user wants to open workspace
    Write-Host ""
    $response = Read-Host "🚀 Open the workspace in VS Code now? (y/n)"
    if ($response -eq 'y' -or $response -eq 'Y') {
        Print-Info "Opening VS Code workspace..."
        code $WorkspaceFilePath
        Print-Status "Workspace opened in VS Code!"
    }
} else {
    Print-Warning "VS Code not found. Please install VS Code and open the workspace manually:"
    Print-Info "code `"$WorkspaceFilePath`""
}

Write-Host ""
Write-Host "==============================================================" -ForegroundColor Cyan
Print-Status "🎉 Workspace setup complete!"
Write-Host ""
Print-Info "Next steps:"
Write-Host "1. 📝 Review the current epic: project-management/epics/epic-003/"
Write-Host "2. 📋 Check sprint status: project-management/sprints/current/"
Write-Host "3. 📚 Read user guides: business-docs/user-guides/"
Write-Host "4. 🚀 Start contributing using the templates/"
Write-Host ""
Print-Info "Need help? Check WINDOWS-SETUP.md or README.md"
Write-Host "==============================================================" -ForegroundColor Cyan
