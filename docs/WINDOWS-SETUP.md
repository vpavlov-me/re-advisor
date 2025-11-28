# 🪟 Windows Setup Guide - Family Governance Platform

**Полное руководство по настройке для Windows пользователей (для non-technical команды)**

**💡 Совет:** Если вы не знакомы с PowerShell, используйте **Option 1: Simple Manual Setup** - это проще и понятнее!

## 📋 Prerequisites

Before starting, make sure you have:

### 1. Git for Windows (REQUIRED)
**Download:** https://git-scm.com/download/win

**Important settings during installation:**
- ✅ **Select "Git from the command line and also from 3rd-party software"**
- ✅ **Select "Use Windows' default console window"** or "Use MinTTY"
- ✅ **Select "Checkout Windows-style, commit Unix-style line endings"**

**After installation, verify:**
```powershell
git --version
# Should show: git version 2.x.x
```

### 2. Visual Studio Code (REQUIRED)
**Download:** https://code.visualstudio.com/

**Important settings during installation:**
- ✅ Add "Open with Code" action to Windows Explorer context menu
- ✅ Add Code to PATH

**After installation, verify:**
```powershell
code --version
# Should show version number
```

### 3. PowerShell 5.1+ (Already included in Windows 10/11)
**Verify version:**
```powershell
$PSVersionTable.PSVersion
# Should show 5.1 or higher
```

## 🚀 Quick Setup (Recommended)

### Option 1: Simple Manual Setup (Easiest for Non-Tech Users)

**Преимущества:** Понятно что происходит на каждом шаге, не требует знания PowerShell.

**Шаг 1: Создайте папку для проекта**
1. Откройте Проводник (Explorer)
2. Перейдите в папку Документы (Documents)
3. Создайте новую папку: `family-governance-workspace`
4. Откройте эту папку

**Шаг 2: Откройте PowerShell в этой папке**
1. Кликните в адресную строку Проводника (где написан путь к папке)
2. Напишите `powershell` и нажмите Enter
3. Откроется синее окно PowerShell - это нормально!

**💡 Альтернатива:** Правой кнопкой по папке → "Open in Terminal" (если есть)

**Шаг 3: Скачайте репозитории**

Скопируйте и вставьте эти команды (по одной):
```powershell
git clone https://github.com/Reluna-Family/FG.git
```
⏳ Подождите пока скачается (увидите "done")

Затем вторую команду:
```powershell
git clone https://github.com/Reluna-Family/FG_Docs.git
```
⏳ Снова подождите завершения

**✅ Теперь у вас есть две папки: `FG` и `FG_Docs`**

**Шаг 4: Откройте в VS Code**
```powershell
code FG_Docs
```
📝 VS Code откроется с папкой FG_Docs

**Шаг 5: Добавьте второй репозиторий в workspace**
1. В VS Code: **File** → **Add Folder to Workspace**
2. Выберите папку `FG` (она рядом с FG_Docs)
3. **File** → **Save Workspace As**
4. Сохраните как: `FG-Workspace.code-workspace`

**Шаг 6: Установите расширения**

В VS Code нажмите `Ctrl+Shift+X` и установите:
- **Markdown All in One**
- **GitLens**
- **markdownlint**

**✅ Готово! Теперь у вас настроен workspace.**

---

### Option 2: PowerShell Script (Для продвинутых пользователей)

**⚠️ Внимание:** Этот метод требует понимания PowerShell и execution policies.

**Если скрипт не запускается, используйте Option 1 выше (намного проще!).**

**Команда для запуска скрипта:**
```powershell
# Создайте папку и клонируйте репозитории (см. Option 1, шаги 1-3)
# Затем запустите:
cd FG_Docs
PowerShell -ExecutionPolicy Bypass -File .\setup-workspace.ps1
```

**Что делает скрипт:**
- Создает VS Code workspace файл
- Создает структуру папок
- Устанавливает VS Code расширения
- Открывает workspace автоматически

---

## 🛠 Manual Setup (Alternative)

If the automatic script doesn't work, follow these manual steps:

### Step 1: Create Workspace Folder
```powershell
# Using Documents folder (recommended)
New-Item -ItemType Directory -Path "$env:USERPROFILE\Documents\family-governance-workspace" -Force
cd "$env:USERPROFILE\Documents\family-governance-workspace"
```

### Step 2: Clone Repositories
```powershell
git clone https://github.com/Reluna-Family/FG.git
git clone https://github.com/Reluna-Family/FG_Docs.git
```

### Step 3: Open in VS Code
```powershell
code .\FG_Docs
```

### Step 4: Install Extensions Manually

In VS Code, press `Ctrl+Shift+X` to open Extensions, then install:
- **Markdown All in One** by Yu Zhang
- **Markdown Preview Enhanced** by Yiyi Wang
- **markdownlint** by David Anson
- **GitLens** by GitKraken
- **Todo Tree** by Gruntfuggly

### Step 5: Configure Workspace

Create file `FG-Complete-Workspace.code-workspace` in workspace root:

**Location:** `Documents\family-governance-workspace\FG-Complete-Workspace.code-workspace`

Copy content from [setup-workspace.ps1](./setup-workspace.ps1) workspace section.

---

## 🔧 Windows-Specific Git Configuration

### Set Up Git Bash as Default Terminal in VS Code

**1. Open VS Code Settings** (`Ctrl + ,`)

**2. Search for:** `terminal.integrated.defaultProfile.windows`

**3. Set value to:** `Git Bash`

**Why?** Git Bash provides Unix-like commands that work consistently across platforms.

### Configure Git (First Time Only)

```bash
# Open Git Bash and configure your identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Configure line endings for cross-platform collaboration
git config --global core.autocrlf true

# Set default branch name
git config --global init.defaultBranch main
```

---

## 📝 Working with Git on Windows

### Using Git Bash (Recommended)

**Open Git Bash in VS Code:**
1. Open terminal in VS Code (`Ctrl + ~`)
2. Click dropdown next to `+` icon
3. Select "Git Bash"

**All standard Git commands work:**
```bash
git status
git add .
git commit -m "Your message"
git push
git pull
```

### Using PowerShell (Alternative)

**PowerShell works with Git commands, but:**
- Use double quotes `"` instead of single quotes `'`
- Some Unix commands don't work (use PowerShell equivalents)

```powershell
# Git commands work the same
git status
git add .
git commit -m "Your message"
git push
git pull
```

---

## 🚨 Common Windows Issues & Solutions

### Issue 1: "The term '.\setup-workspace.ps1' is not recognized"

**Full Error:**
```
.\setup-workspace.ps1 : The term '.\setup-workspace.ps1' is not recognized as the name of a cmdlet,
function, script file, or operable program.
```

**Причина:** PowerShell Execution Policy блокирует выполнение скриптов для безопасности.

**Решения (попробуйте в порядке):**

**1️⃣ Самое быстрое - Bypass для одного запуска:**
```powershell
PowerShell -ExecutionPolicy Bypass -File .\setup-workspace.ps1
```
✅ Безопасно - действует только для этого скрипта, один раз

**2️⃣ Разблокировать файл (если скачан из интернета):**
```powershell
Unblock-File .\setup-workspace.ps1
.\setup-workspace.ps1
```
✅ Windows помечает файлы из интернета как небезопасные

**3️⃣ Изменить policy для текущего пользователя:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\setup-workspace.ps1
```
✅ Постоянное решение, безопасное (только для вашего пользователя)

**4️⃣ Проверить текущий policy:**
```powershell
Get-ExecutionPolicy -List
```
Должно показать `RemoteSigned` или `Unrestricted` для CurrentUser

---

### Issue 2: "File cannot be loaded because running scripts is disabled"

**Error:**
```
.\setup-workspace.ps1 : File cannot be loaded because running scripts is disabled on this system.
```

**Solution:**
```powershell
# Change execution policy for current user (doesn't need Administrator)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# OR run with Bypass (one-time)
PowerShell -ExecutionPolicy Bypass -File .\setup-workspace.ps1
```

---

### Issue 3: Line Ending Warnings

**Error:**
```
warning: LF will be replaced by CRLF in file.md
```

**Solution:**
```bash
# This is normal on Windows - Git handles it automatically
# If you want to suppress warnings:
git config --global core.autocrlf true
```

---

### Issue 3: "bash: ./script.sh: Permission denied"

**Error when running bash scripts:**
```
bash: ./setup-workspace.sh: Permission denied
```

**Solution:**
```bash
# Make script executable
chmod +x setup-workspace.sh
./setup-workspace.sh
```

---

### Issue 4: VS Code doesn't recognize 'code' command

**Solution:**
1. Reinstall VS Code with "Add to PATH" option selected
2. **OR** Restart your computer
3. **OR** Add VS Code to PATH manually:
   - Search "Environment Variables" in Windows
   - Add: `C:\Users\YourUsername\AppData\Local\Programs\Microsoft VS Code\bin`

---

### Issue 5: Git is not recognized

**Error:**
```
'git' is not recognized as an internal or external command
```

**Solution:**
1. Install Git for Windows from: https://git-scm.com/download/win
2. Restart PowerShell/Terminal
3. Verify: `git --version`

---

## 📁 Windows File Paths Reference

**Key differences from Mac/Linux:**

| Concept | Windows | Mac/Linux |
|---------|---------|-----------|
| Home directory | `C:\Users\YourName` | `~/` or `/Users/YourName` |
| Path separator | `\` (backslash) | `/` (forward slash) |
| Documents folder | `Documents\` | `~/Documents/` |
| Current directory | `.\` | `./` |
| Parent directory | `..\` | `../` |

**In VS Code terminal:** Use forward slashes `/` - they work on Windows too!

```bash
# Both work in Git Bash
cd Documents/family-governance-workspace
cd Documents\family-governance-workspace
```

---

## 🎯 Quick Start Checklist

Once setup is complete, verify everything works:

- [ ] **Git installed:** `git --version` shows version
- [ ] **VS Code installed:** `code --version` shows version
- [ ] **Repositories cloned:** Both `FG` and `FG_Docs` folders exist
- [ ] **Git Bash works:** Can open Git Bash terminal in VS Code
- [ ] **Git configured:** `git config --global user.name` shows your name
- [ ] **Can commit:** Try editing a file, then `git status` works
- [ ] **Extensions installed:** Markdown preview works in VS Code

---

## 📚 Next Steps

After setup is complete:

1. **Review Current Epic**
   - Location: [project-management/epics/epic-003/](./project-management/epics/epic-003/)
   - Read: `epic-basic-advisor-registration-profile.md`

2. **Check Sprint Status**
   - Location: [project-management/sprints/](./project-management/sprints/)

3. **Read Getting Started Guide**
   - Location: [business-docs/user-guides/](./business-docs/user-guides/)

4. **Learn Git Basics**
   - Read: [GIT-GUIDE.md](./GIT-GUIDE.md)

---

## 🆘 Getting Help

### Common Resources
- **Windows Git Issues:** Check [Git for Windows Documentation](https://gitforwindows.org/)
- **VS Code Issues:** Check [VS Code Documentation](https://code.visualstudio.com/docs)
- **PowerShell Help:** Type `Get-Help <command>` in PowerShell

### Team Support
- **Slack:** #family-governance
- **GitHub Issues:** Create issue in [FG_Docs repository](https://github.com/Reluna-Family/FG_Docs/issues)
- **Email:** project-manager@reluna.com

### AI Assistance
**Use Claude/Copilot in VS Code:**
1. Press `Ctrl+Shift+P`
2. Type "Claude" or "Copilot"
3. Describe your problem: "I'm on Windows and getting this error: [paste error]"

---

## 💡 Pro Tips for Windows Users

### 1. Use Git Bash for Commands
Git Bash provides Unix-like environment that matches Mac/Linux instructions in documentation.

### 2. Windows Terminal is Great
**Install from Microsoft Store:** Search "Windows Terminal"
- Supports tabs
- Better copy/paste
- Customizable

### 3. File Explorer Integration
After installing Git for Windows:
- Right-click any folder
- Select "Git Bash Here" to open terminal in that location

### 4. VS Code Terminal Shortcuts
- `` Ctrl + ` `` - Toggle terminal
- `Ctrl+Shift+5` - Split terminal
- `Ctrl+Shift+~` - New terminal

### 5. Avoid Spaces in Folder Names
While they work, spaces in paths can cause issues:
- ✅ Good: `family-governance-workspace`
- ❌ Avoid: `family governance workspace`

---

## 🔍 Troubleshooting Checklist

If something doesn't work:

1. **Restart VS Code** - Solves 50% of issues
2. **Restart Terminal** - Close and reopen terminal tab
3. **Check Git Bash** - Make sure you're using Git Bash, not CMD/PowerShell for Unix commands
4. **Verify Git Config** - Run `git config --list` to see all settings
5. **Check File Permissions** - Right-click folder → Properties → Security
6. **Run as Administrator** - For installation/setup issues only
7. **Check Windows Updates** - Sometimes fixes compatibility issues
8. **Ask for Help** - Don't struggle alone! Post in Slack or create GitHub Issue

---

## 📖 Additional Windows Resources

### Documentation
- **Git for Windows:** https://gitforwindows.org/
- **Git Documentation:** https://git-scm.com/doc
- **VS Code on Windows:** https://code.visualstudio.com/docs/setup/windows
- **PowerShell Documentation:** https://docs.microsoft.com/powershell/

### Useful Tools (Optional)
- **Windows Terminal:** Modern terminal app (Microsoft Store)
- **GitHub Desktop:** GUI for Git operations (https://desktop.github.com/)
- **WSL2:** Run Linux on Windows (advanced users)

---

**✅ You're all set! Your Windows machine is now configured for the Family Governance Platform project.**

If you followed all steps, your workspace should be identical to Mac/Linux users. All documentation commands will work the same way in Git Bash.

**Happy documenting! 🚀**
