#!/bin/bash

# FG_Docs Workspace Setup Script
# Automatically configures VS Code workspace for Family Governance Platform
# Designed for non-technical team members

set -e

echo "🚀 Setting up Family Governance Platform Workspace..."
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if we're in the correct directory
if [[ ! -f "README.md" ]] || ! grep -q "FG_Docs" README.md 2>/dev/null; then
    print_error "Please run this script from the FG_Docs directory"
    exit 1
fi

# Get the current directory
CURRENT_DIR=$(pwd)
WORKSPACE_DIR=$(dirname "$CURRENT_DIR")

print_info "Current directory: $CURRENT_DIR"
print_info "Workspace directory: $WORKSPACE_DIR"

# Check if FG repository exists
if [[ ! -d "$WORKSPACE_DIR/FG" ]]; then
    print_warning "FG repository not found at $WORKSPACE_DIR/FG"
    echo "Please clone it first:"
    echo "cd $WORKSPACE_DIR && git clone https://github.com/Reluna-Family/FG.git"
    read -p "Do you want to clone it now? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cd "$WORKSPACE_DIR"
        git clone https://github.com/Reluna-Family/FG.git
        print_status "FG repository cloned successfully"
    else
        print_error "FG repository is required. Exiting."
        exit 1
    fi
fi

# Create workspace file
print_info "Creating VS Code workspace configuration..."

cat > "$WORKSPACE_DIR/FG-Complete-Workspace.code-workspace" << 'EOF'
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
    "git.autofetch": true
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
        "command": "cp",
        "args": ["templates/epic-template.md", "project-management/epics/epic-new.md"],
        "options": {
          "cwd": "${workspaceFolder:📚 FG Documentation & PM}"
        },
        "group": "build",
        "presentation": {
          "reveal": "always"
        }
      },
      {
        "label": "📋 Create Sprint Report",
        "type": "shell",
        "command": "cp",
        "args": ["templates/sprint-template.md", "project-management/sprints/sprint-$(date +%Y-%m-%d).md"],
        "options": {
          "cwd": "${workspaceFolder:📚 FG Documentation & PM}"
        },
        "group": "build"
      },
      {
        "label": "🚀 Start Development Stack",
        "type": "shell",
        "command": "./start-local-dev.sh",
        "options": {
          "cwd": "${workspaceFolder:🏠 FG Root}"
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
EOF

print_status "Workspace configuration created: $WORKSPACE_DIR/FG-Complete-Workspace.code-workspace"

# Create basic directory structure if not exists
print_info "Setting up directory structure..."

mkdir -p business-docs/{requirements,user-guides,processes,glossary}
mkdir -p reports/{sprint-reports,metrics,stakeholder-updates}
mkdir -p scripts/templates
mkdir -p templates

print_status "Directory structure created"

# Create essential template files
print_info "Creating template files..."

# Epic template
cat > templates/epic-template.md << 'EOF'
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
EOF

# Sprint template
cat > templates/sprint-template.md << 'EOF'
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
EOF

print_status "Template files created"

# Check if VS Code is installed
if command -v code &> /dev/null; then
    print_info "VS Code detected. Installing recommended extensions..."
    
    # Install extensions silently
    code --install-extension yzhang.markdown-all-in-one --force > /dev/null 2>&1 || true
    code --install-extension davidanson.vscode-markdownlint --force > /dev/null 2>&1 || true
    code --install-extension eamodio.gitlens --force > /dev/null 2>&1 || true
    code --install-extension gruntfuggly.todo-tree --force > /dev/null 2>&1 || true
    code --install-extension streetsidesoftware.code-spell-checker --force > /dev/null 2>&1 || true
    
    print_status "VS Code extensions installed"
    
    # Ask if user wants to open workspace
    echo
    read -p "🚀 Open the workspace in VS Code now? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_info "Opening VS Code workspace..."
        code "$WORKSPACE_DIR/FG-Complete-Workspace.code-workspace"
        print_status "Workspace opened in VS Code!"
    fi
else
    print_warning "VS Code not found. Please install VS Code and open the workspace manually:"
    print_info "code $WORKSPACE_DIR/FG-Complete-Workspace.code-workspace"
fi

echo
echo "=================================================="
print_status "🎉 Workspace setup complete!"
echo
print_info "Next steps:"
echo "1. 📝 Review the current epic: project-management/epics/epic-003/"
echo "2. 📋 Check sprint status: project-management/sprints/current/"
echo "3. 📚 Read user guides: business-docs/user-guides/"
echo "4. 🚀 Start contributing using the templates/"
echo
print_info "Need help? Check README.md or ask in Slack #family-governance"
echo "=================================================="