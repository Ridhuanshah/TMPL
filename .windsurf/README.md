# Windsurf Workflows & Configuration

This directory contains workflows and configuration files for Cascade AI agent.

## Directory Structure

```
.windsurf/
├── README.md           # This file
├── progress.md         # Session tracking and progress notes
└── workflows/          # Predefined workflows
    ├── quick-start.md
    ├── supabase-setup.md
    ├── debug-supabase-issues.md
    ├── test-with-playwright.md
    ├── deploy-to-vercel.md
    ├── create-new-feature.md
    └── mcp-best-practices.md
```

## Available Workflows

### Development
- **`/quick-start`** - Start development quickly
- **`/create-new-feature`** - Systematic feature development

### Database
- **`/supabase-setup`** - Configure Supabase connection
- **`/debug-supabase-issues`** - Troubleshoot database problems

### Testing
- **`/test-with-playwright`** - Browser testing automation

### Deployment
- **`/deploy-to-vercel`** - Deploy to production

### Learning
- **`/mcp-best-practices`** - Learn MCP server usage

## How Workflows Work

1. **Type `/workflow-name`** in Cascade chat
2. Cascade reads the workflow file
3. Follows the steps systematically
4. Some commands auto-run (marked with `// turbo`)

## Progress Tracking

Update `progress.md` each session:
- Active tasks
- Blockers
- Completed work
- Next actions
- Session notes

## MCP Servers Available

- **mcp2 (Playwright)** - Browser automation
- **mcp5 (Supabase)** - Database operations
- **mcp3 (Memory)** - Context retention
- **mcp4 (Sequential Thinking)** - Problem-solving

## Quick Reference

### TMPL Escapade Specifics
- **Dev Server:** http://localhost:5173
- **Production:** https://tmpl-pi.vercel.app
- **Supabase:** vvrmfgealitetfgwsdeu
- **Database:** 23 tables, PostgreSQL 17.6

### Test Accounts
```
superadmin@tmplescapade.my / super123
admin@tmplescapade.my / admin123
booking@tmplescapade.my / booking123
tourguide@tmplescapade.my / guide123
agent@tmplescapade.my / agent123
finance@tmplescapade.my / finance123
marketing@tmplescapade.my / marketing123
```

## More Information

See `CASCADE_ENHANCEMENT_RECOMMENDATIONS.md` in project root for complete details.
