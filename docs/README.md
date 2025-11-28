# FG_Docs - Family Governance Documentation & Project Management

![Documentation](https://img.shields.io/badge/Docs-Family%20Governance-blue?logo=gitbook&logoColor=white)
![Project Management](https://img.shields.io/badge/PM-Agile%20Workflow-green?logo=notion&logoColor=white)
![Business Friendly](https://img.shields.io/badge/Business-Friendly-purple?logo=microsoft&logoColor=white)

📚 **Documentation, project management, and business processes** for the Family Governance Platform. Designed for **non-technical team members** to collaborate effectively with developers.

## � What's This Repository For?

This repository contains:
- **📋 Project Management** - Epics, user stories, sprint planning
- **� Business Documentation** - Requirements, processes, user guides  
- **🔄 Workflows** - How we work together (business + technical teams)
- **📊 Reporting** - Progress tracking and metrics

**Who uses this:**
- ✅ **Business Analysts** - Requirements and user stories
- ✅ **Project Managers** - Sprint planning and tracking
- ✅ **Product Owners** - Feature prioritization
- ✅ **QA/Testing** - Test plans and scenarios
- ✅ **Stakeholders** - Progress reports and demos

## 🚀 Quick Start (VS Code Setup)

### ⚡ Choose Your Platform
- **🪟 Windows Users:** [WINDOWS-SETUP.md](./WINDOWS-SETUP.md) - Complete Windows setup guide
- **🍎 Mac / 🐧 Linux Users:** Follow instructions below
- **📖 New Team Members:** [QUICK-START.md](./QUICK-START.md) - Simple step-by-step guide

---

### Step 1: Clone Both Repositories

**Mac/Linux:**
```bash
# Create workspace folder
mkdir -p ~/family-governance-workspace
cd ~/family-governance-workspace

# Clone both repositories
git clone https://github.com/Reluna-Family/FG.git
git clone https://github.com/Reluna-Family/FG_Docs.git
```

**Windows PowerShell:**
```powershell
# Create workspace folder
New-Item -ItemType Directory -Path "$env:USERPROFILE\Documents\family-governance-workspace" -Force
cd "$env:USERPROFILE\Documents\family-governance-workspace"

# Clone both repositories
git clone https://github.com/Reluna-Family/FG.git
git clone https://github.com/Reluna-Family/FG_Docs.git
```

### Step 2: Auto-Setup Workspace (Recommended)

**Mac/Linux:**
```bash
cd FG_Docs
./setup-workspace.sh
```

**Windows PowerShell:**
```powershell
cd FG_Docs
.\setup-workspace.ps1
```

This script will:
- ✅ Set up VS Code workspace with both repositories
- ✅ Install recommended extensions for documentation
- ✅ Configure folders for easy navigation
- ✅ Open the workspace automatically

## 📋 Project Management

### Current Epic: [EPIC-003] Advisor Registration & Management
**Status:** In Development | **Sprint:** 1-3 | **Target:** Q1 2025

**Key Deliverables:**
- [ ] Advisor authentication system
- [ ] Profile management interface  
- [ ] Association and compliance tracking
- [ ] Integration with existing family portal

**Documentation:** `project-management/epics/epic-003/`

### Sprint Planning
- **Sprint Duration:** 2 weeks
- **Planning:** Mondays (business + tech alignment)
- **Reviews:** Fridays (demo + retrospective)
- **Artifacts:** `project-management/sprints/`

## 📖 Documentation Standards

### Business Documentation
- **Requirements:** Business needs, user stories, acceptance criteria
- **Processes:** Workflows, procedures, governance frameworks
- **Decisions:** Architecture decisions, business rule changes
- **User Guides:** End-user documentation, training materials

### Template Usage
- **Epic Template:** `templates/epic-template.md`
- **Sprint Template:** `templates/sprint-template.md`
- **Business Process:** `templates/process-template.md`
- **User Story:** `templates/user-story-template.md`

## 🔄 Business Processes

### Core Governance Workflows
1. **Epic Planning Process** - `business-processes/epic-planning.md`
2. **Sprint Execution** - `business-processes/sprint-execution.md`
3. **Change Management** - `business-processes/change-management.md`
4. **Quality Assurance** - `business-processes/qa-process.md`

### Stakeholder Engagement
- **Weekly Business Reviews** - Progress, blockers, priorities
- **Monthly Strategic Planning** - Roadmap, feature prioritization
- **Quarterly Business Alignment** - Goals, metrics, strategy review

## 🚀 Getting Started

### For Business Stakeholders
1. **Review current epic:** `project-management/epics/epic-003/`
2. **Check sprint status:** `project-management/sprints/current/`
3. **Understand processes:** `business-processes/`
4. **Use templates:** `templates/` for new requirements

### For Technical Teams
1. **Sync with PM artifacts** for context and requirements
2. **Reference business processes** for compliance and workflows
3. **Update documentation** as features are implemented
4. **Collaborate via issues** and pull requests

### For Project Managers
1. **Maintain sprint artifacts** in `project-management/sprints/`
2. **Track epics** in `project-management/epics/`
3. **Document decisions** in `documentation/decisions/`
4. **Generate reports** using `workflows/reporting/`

## 🔗 Integration with Technical Repository

**Main Code Repository:** [Reluna-Family/FG](https://github.com/Reluna-Family/FG)

### Workspace Integration
Both repositories are integrated in the **FG-workspace.code-workspace**:
- 📚 **Documentation & PM** (this repo) - Business and process documentation
- 🏠 **FG Root** - Main codebase and technical implementation
- 🚀 **Turbo Stack** - Modern TypeScript applications
- 🔧 **Backend Services** - Python FastAPI microservices

### Cross-Repository Workflow
1. **Business requirements** documented here → **Technical implementation** in FG repo
2. **Epic planning** here → **Task breakdown** in FG repo
3. **Process changes** here → **Code updates** in FG repo
4. **Reports and metrics** here ← **Development progress** from FG repo

## 📊 Metrics & Reporting

### Project Health Indicators
- **Epic Progress:** Completion percentage, blockers, timeline
- **Sprint Velocity:** Story points, completion rate, trends
- **Quality Metrics:** Bug rates, customer satisfaction, performance
- **Business Value:** Feature adoption, user engagement, ROI

### Automated Reporting
- **Weekly Status Reports** - Generated from GitHub data
- **Sprint Summaries** - Automated compilation of achievements
- **Epic Dashboards** - Real-time progress tracking
- **Stakeholder Updates** - Business-friendly progress summaries

## 🤝 Collaboration Guidelines

### Communication Channels
- **GitHub Issues** - Requirements, changes, discussions
- **Pull Requests** - Documentation updates, process changes
- **Discussions** - Strategic planning, architectural decisions
- **Project Boards** - Visual progress tracking

### Review Process
- **Business Reviews** - Weekly stakeholder alignment
- **Technical Reviews** - Architecture and implementation validation
- **Process Reviews** - Continuous improvement of workflows
- **Documentation Reviews** - Accuracy and completeness validation

## 📝 Contributing

### Documentation Updates
1. Use appropriate templates from `templates/`
2. Follow naming conventions: `YYYY-MM-DD-descriptive-name.md`
3. Link to related technical implementations
4. Tag relevant stakeholders for review

### Process Improvements
1. Document current state in `business-processes/`
2. Propose changes via GitHub Issues
3. Get stakeholder approval
4. Update documentation and templates
5. Communicate changes to all teams

## 📚 Quick Access Links

| Resource | Description |
|----------|-------------|
| 🚀 **[QUICK-START.md](QUICK-START.md)** | 2-minute setup for new team members |
| 🪟 **[WINDOWS-SETUP.md](WINDOWS-SETUP.md)** | Complete Windows setup guide with PowerShell script |
| 📖 **[SETUP-GUIDE.md](SETUP-GUIDE.md)** | Detailed setup guide for all platforms |
| 📚 **[GIT-GUIDE.md](GIT-GUIDE.md)** | Git basics for non-technical team (with Windows instructions) |
| ✅ **[ONBOARDING-CHECKLIST.md](ONBOARDING-CHECKLIST.md)** | Complete onboarding process |
| 🤖 **[CLAUDE-CODE-GUIDE.md](CLAUDE-CODE-GUIDE.md)** | AI assistant guide for documentation work |
| 📋 **[Current Epic](project-management/epics/epic-003/)** | Adviser registration features |
| 📊 **[Sprint Status](project-management/sprints/current/)** | Current sprint progress |
| 🔧 **[Main Code Repo](https://github.com/Reluna-Family/FG)** | Technical implementation |

---

**Last Updated:** October 22, 2025  
**Maintained by:** Family Governance Platform Team  
**Contact:** Project Management Office
