# Family Governance Platform - Complete Setup Guide

## 🚀 Quick Setup for Business Team Members

### Choose Your Operating System

**🪟 Windows Users:** See dedicated [WINDOWS-SETUP.md](./WINDOWS-SETUP.md) guide for detailed Windows-specific instructions.

**🍎 Mac / 🐧 Linux Users:** Follow instructions below.

---

### One-Command Setup (Mac/Linux)
```bash
# 1. Create workspace folder and clone repositories
mkdir -p ~/family-governance-workspace && cd ~/family-governance-workspace

# 2. Clone both repositories
git clone https://github.com/Reluna-Family/FG.git
git clone https://github.com/Reluna-Family/FG_Docs.git

# 3. Run auto-setup script
cd FG_Docs && ./setup-workspace.sh
```

### One-Command Setup (Windows PowerShell)
```powershell
# 1. Create workspace folder
New-Item -ItemType Directory -Path "$env:USERPROFILE\Documents\family-governance-workspace" -Force
cd "$env:USERPROFILE\Documents\family-governance-workspace"

# 2. Clone both repositories
git clone https://github.com/Reluna-Family/FG.git
git clone https://github.com/Reluna-Family/FG_Docs.git

# 3. Run auto-setup script
cd FG_Docs
.\setup-workspace.ps1
```

This script will:
- ✅ Configure VS Code workspace with all folders
- ✅ Install documentation extensions
- ✅ Create template files
- ✅ Open workspace automatically

## 📁 Workspace Structure

After setup, your VS Code will show these folders:

```
Family Governance Workspace
├── 📚 FG Documentation & PM (this repo)
│   ├── project-management/     # Epics, sprints, planning
│   ├── business-docs/         # Requirements, user guides
│   ├── reports/               # Progress tracking
│   └── templates/             # Document templates
├── 🏠 FG Root (main code repo)
│   ├── backend/               # Python services
│   ├── frontend/              # React portals  
│   ├── turbo/                 # Modern TypeScript apps
│   └── scripts/               # Development tools
├── 🚀 Turbo Stack (modern apps)
├── 🔧 Backend Services (Python APIs)
├── ⚛️ Frontend React App (legacy)
├── 👨‍💼 Admin Portal
└── 🤝 Advisor Portal
```

## 🎯 Your First Tasks

### 1. Review Current Epic
📍 **Location:** `project-management/epics/epic-003/README.md`
📋 **What:** Adviser Registration & Profile Management
⏰ **Timeline:** 3 sprints (6 weeks)

### 2. Check Sprint Progress  
📍 **Location:** `project-management/sprints/current/sprint-1-status.md`
📊 **Status:** Sprint 1 - Day 2 of 10
🎯 **Goal:** Build foundation services for adviser registration

### 3. Understand Your Role
📚 **Read:** `business-docs/user-guides/getting-started.md`
🎭 **Your Part:** Requirements, testing, documentation, stakeholder communication

## 📝 Available Templates

Create new documents using these templates:

| Template | Use Case | Location |
|----------|----------|----------|
| 📋 **Epic Template** | Major features (3+ sprints) | `templates/epic-template.md` |
| 🏃‍♀️ **Sprint Template** | Sprint planning & retrospectives | `templates/sprint-template.md` |
| 👤 **User Story Template** | Individual user requirements | `templates/user-story-template.md` |
| 📄 **Requirement Template** | Detailed feature specifications | `templates/requirement-template.md` |

## 🔧 VS Code Tasks

Use **Ctrl+Shift+P → "Tasks: Run Task"** to access:

### Documentation Tasks
- **📝 Create New Epic** - Copy epic template
- **📋 Create Sprint Report** - Copy sprint template  

### Development Tasks  
- **🚀 Start Development Stack** - Run Docker services
- **🛑 Stop Development Stack** - Stop all services

## 🆘 Getting Help

### Quick References
- **Current Epic:** `project-management/epics/epic-003/README.md`
- **Getting Started:** `business-docs/user-guides/getting-started.md`
- **Sprint Status:** `project-management/sprints/current/sprint-1-status.md`

### Contact Points
- **Slack:** #family-governance
- **Project Questions:** Create GitHub Issue in FG_Docs
- **Technical Issues:** Create GitHub Issue in FG main repo
- **Urgent Matters:** project-manager@reluna.com

## 🎉 Success! You're Ready

✅ **Workspace configured** with both business and technical repositories  
✅ **Documentation tools** installed and ready  
✅ **Current project context** available  
✅ **Templates and guides** at your fingertips  

### Next Steps
1. **Review current epic** and add your input
2. **Join daily standups** to stay connected
3. **Use templates** to create new requirements
4. **Ask questions** via GitHub Issues or Slack

---

💡 **Pro Tip:** Bookmark this setup guide and share it with new team members!