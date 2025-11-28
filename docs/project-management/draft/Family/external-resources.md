---
doc_id: "DOC-REF-001"
title: "External Resources for LWAM Product Knowledge"
type: "reference"
category: "business"
audience: "stakeholder"
complexity: "beginner"
created: "2025-09-20"
updated: "2025-09-20"
version: "1.0.0"
status: "published"
tags: ["resources", "wealth-management", "glossary", "learning", "external"]
related: ["DOC-GOV-002"]
owner: "abronina"
maintainer: "abronina"
reviewer: ""
review_cycle: "quarterly"
next_review: "2025-12-20"
last_review: ""
review_notes: ""
---

# External Resources for LWAM Product Knowledge

## 📋 Overview

This document contains curated external resources to help Product Managers, Business Analysts, QA Engineers, and other stakeholders understand wealth management concepts, financial terminology, and industry standards relevant to the LWAM platform.

## 🎯 How to Use This Guide

**For Product Managers:** Use glossaries to ensure correct terminology in requirements and specifications
**For Business Analysts:** Reference educational platforms for understanding complex financial processes  
**For QA Engineers:** Use regulatory resources to understand compliance requirements for testing
**For New Team Members:** Start with "Начальный" level resources, progress to "Продвинутый"

## 📚 Financial Terminology & Glossaries

### Universal Resources (✅ Универсальный)

| Resource | Link | Purpose | Level | Usage Guide |
|----------|------|---------|-------|-------------|
| **Investopedia** | [investopedia.com](https://www.investopedia.com/financial-term-dictionary-4769738) | Простые и понятные объяснения финансовых терминов, процессов (bond redemption, custodian, FoP, DMA) и ролей. Отлично объясняет "как работает" с примерами. | ✅ Универсальный | Search for any financial term you encounter in requirements or user stories. Great for understanding "what is X" and "how does X work" |

### Beginner / Product-Focused Resources (🟢 Начальный)

| Resource | Link | Purpose | Level | Usage Guide |
|----------|------|---------|-------|-------------|
| **Simple (AndSimple Glossary)** | [andsimple.com/glossary](https://andsimple.com/glossary) | Отлично подходит для понимания терминов в семейных офисах: FO, MFO, SMO, governance, UHNWI и т.д. Упрощает сложный язык wealth management. | 🟢 Начальный / продуктовый | Perfect for understanding Family Office terminology when documenting client personas and wealth management workflows |

### Advanced / Professional Resources (🔷 Продвинутый)

| Resource | Link | Purpose | Level | Usage Guide |
|----------|------|---------|-------|-------------|
| **CFA Institute Glossary** | [cfainstitute.org/glossary](https://www.cfainstitute.org/glossary) | Официальные термины CFA Program — точно, строго, академично. Подходит, если нужно точно формулировать определения для документации. | 🔷 Продвинутый | Use for precise, authoritative definitions when writing technical specifications or business glossary entries |
| **Corporate Finance Institute (CFI)** | [corporatefinanceinstitute.com](https://corporatefinanceinstitute.com/resources) | Более развернутое объяснение понятий и процессов: торговля, settlement, IRR, OTC, DMA и др. Полезно для бизнес-логики в расчетах и трейдинге. | 🔷 Продвинутый / продуктовый | Excellent for understanding complex financial processes when documenting OMS, calculations, and trading workflows |
| **FINRA – Terms & Acronyms** | [finra.org/terms-acronyms](https://www.finra.org/rules-guidance/key-topics/terms-acronyms) | Проверенные объяснения и расшифровка аббревиатур (DMA, OTC, DvP, FoP и т.д.) — идеально, чтобы не ошибиться в терминологии при описании модулей Order Management или Compliance. | 🔷 Продвинутый / техдокументация | Reference when documenting compliance requirements, trading processes, and regulatory features |

## 🏛️ Regulatory & Compliance Resources

| Resource | Link | Purpose | Level | Usage Guide |
|----------|------|---------|-------|-------------|
| **MiFID II Quick Reference** | [esma.europa.eu](https://www.esma.europa.eu/policy-rules/mifid-ii-and-mifir) | Understanding EU trading regulations | 🔷 Продвинутый | Use when documenting compliance features and trading restrictions |
| **EMIR Guidelines** | [esma.europa.eu](https://www.esma.europa.eu/policy-rules/post-trading/emir) | European Market Infrastructure Regulation | 🔷 Продвинутый | Reference for derivatives reporting and risk mitigation features |

## 🧠 AI Prompt Templates for Domain Research

### For Product Managers
```
"Explain [wealth management term] in simple business terms, focusing on:
- Why it matters to wealth managers
- How it impacts client relationships  
- What system features would support this process"
```

### For Business Analysts  
```
"Describe the [financial process] workflow, including:
- All stakeholders involved
- Required data inputs and outputs
- Compliance requirements
- Potential failure scenarios"
```

### For QA Engineers
```
"What are the key validation rules and edge cases for [financial calculation/process]:
- Regulatory requirements
- Data validation rules
- Error scenarios to test
- Performance considerations"
```

## 📖 Industry Learning Resources

### Wealth Management Basics
- **Family Office Exchange** - Industry insights and best practices
- **Capgemini World Wealth Report** - Annual market trends and client expectations
- **PwC Private Company Services** - Governance and operational insights

### Financial Technology
- **FINTech Magazine** - Latest trends in wealth tech
- **WealthManagement.com** - Industry news and technology updates

## 🔄 Maintenance Guidelines

### When to Update This Resource
- **New terminology encountered** in Business Components.csv updates
- **Regulatory changes** affecting LWAM features
- **Team feedback** on missing or outdated resources
- **Quarterly review** of resource availability and usefulness

### How to Contribute
1. **Test the resource** - Ensure it provides value for LWAM documentation
2. **Categorize appropriately** - Assign correct level and audience
3. **Add usage guide** - Explain specifically how to use for LWAM work
4. **Update related docs** - Reference new resources in relevant business modules

---

**Last Updated:** 2025-09-20  
**Next Review:** 2025-12-20  
**Maintainer:** Product Knowledge Team