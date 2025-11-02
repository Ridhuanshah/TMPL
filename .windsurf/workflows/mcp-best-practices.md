---
description: Best practices for using MCP servers effectively
---

# MCP Server Best Practices

## Available MCP Servers

### 1. mcp0: chrome-devtools
Browser DevTools integration (alternative to Playwright)

### 2. mcp1: filesystem
Advanced file operations

### 3. mcp2: playwright ⭐ PRIMARY FOR TESTING
Browser automation and testing

### 4. mcp3: memory
Knowledge graph for context retention

### 5. mcp4: sequential-thinking
Complex problem-solving with chain of thought

### 6. mcp5: supabase-mcp-server ⭐ PRIMARY FOR DATABASE
Direct Supabase operations

## When to Use Each MCP

### Playwright (mcp2) - Use For:
✅ Testing login flows  
✅ Verifying UI changes  
✅ Taking screenshots  
✅ Checking console errors  
✅ Monitoring network requests  
✅ Form testing  
✅ Multi-user role testing  

**Example Flow:**
```
1. mcp2_browser_navigate to http://localhost:5173
2. mcp2_browser_snapshot to get page structure
3. mcp2_browser_fill_form with user credentials
4. mcp2_browser_click on login button
5. mcp2_browser_wait_for with text: "Dashboard"
6. mcp2_browser_console_messages to check for errors
7. mcp2_browser_take_screenshot for documentation
```

### Supabase MCP (mcp5) - Use For:
✅ Direct SQL queries  
✅ Migration management  
✅ RLS policy verification  
✅ Security advisories  
✅ Log monitoring  
✅ Type generation  
✅ Table inspection  

**Example Flow:**
```
1. mcp5_get_advisors (type: security) - Check issues first!
2. mcp5_list_tables (schemas: ['public'])
3. mcp5_execute_sql - Test queries directly
4. mcp5_get_logs (service: 'postgres') - Check errors
5. mcp5_apply_migration - Apply schema changes
6. mcp5_generate_typescript_types - Update types
```

**Critical Commands:**
```
# Always check advisors when debugging
mcp5_get_advisors with type: "security"
mcp5_get_advisors with type: "performance"

# Direct query testing
mcp5_execute_sql with query: "SELECT * FROM users LIMIT 1"

# Monitor logs
mcp5_get_logs with service: "api"
mcp5_get_logs with service: "postgres"
mcp5_get_logs with service: "auth"
```

### Memory MCP (mcp3) - Use For:
✅ Storing project context  
✅ Creating knowledge graph  
✅ Tracking relationships  
✅ Long-term memory  

**Example: Create Project Context**
```
1. mcp3_create_entities with entities: [
  {
    name: "TMPL Escapade",
    entityType: "Project",
    observations: [
      "React 19 + TypeScript travel management system",
      "7 user roles with RBAC",
      "Supabase database with 23 tables"
    ]
  }
]

2. mcp3_create_relations with relations: [
  {
    from: "TMPL Escapade",
    to: "Supabase Database",
    relationType: "uses"
  }
]

3. mcp3_search_nodes when needed to recall context
```

### Sequential Thinking (mcp4) - Use For:
✅ Complex problem-solving  
✅ Multi-step planning  
✅ Debugging complex issues  
✅ Architectural decisions  

**When to Use:**
- Problem requires multiple steps to solve
- Need to explore different approaches
- Uncertain about best solution
- Complex debugging scenarios

## Best Practices

### 1. Always Use Workflows First
Check if a workflow exists:
- /quick-start
- /supabase-setup
- /debug-supabase-issues
- /test-with-playwright
- /deploy-to-vercel
- /create-new-feature

### 2. Playwright Testing Pattern
```
ALWAYS:
1. Take snapshot before interaction
2. Use refs from snapshot (never guess selectors)
3. Check console after major actions
4. Take screenshots for documentation
5. Test with multiple user roles
```

### 3. Supabase Debugging Pattern
```
ORDER OF OPERATIONS:
1. mcp5_get_advisors (security) - Check RLS first!
2. mcp5_list_tables - Verify table exists
3. mcp5_execute_sql - Test query directly
4. mcp5_get_logs - Check for errors
5. Only then check application code
```

### 4. Memory Usage Pattern
```
WHEN TO CREATE MEMORIES:
- Important project decisions made
- Common issues discovered
- Successful solutions found
- User preferences stated
- Complex relationships identified

HOW TO STRUCTURE:
Entity: Concrete thing (Project, Feature, Issue)
Observations: Facts about the entity
Relations: How entities connect
```

### 5. Error Handling
```
WHEN PLAYWRIGHT FAILS:
- Check if dev server is running
- Verify port is correct
- Take screenshot to see state
- Check console messages
- Verify element refs from snapshot

WHEN SUPABASE FAILS:
- Check RLS policies FIRST
- Verify table structure
- Test query directly with mcp5
- Check logs
- Verify environment variables
```

## Common Scenarios

### Scenario 1: New Feature Testing
```
1. Start dev server (npm run dev)
2. Use mcp2_browser_navigate to feature page
3. Use mcp2_browser_snapshot
4. Test all interactions using refs
5. Verify data with mcp5_execute_sql
6. Check mcp2_browser_console_messages
7. Take screenshots for documentation
```

### Scenario 2: Database Issue
```
1. Use mcp5_get_advisors (type: security)
2. If RLS issues, fix policies
3. Use mcp5_list_tables to verify structure
4. Use mcp5_execute_sql to test query
5. Use mcp5_get_logs to find errors
6. Apply fix with mcp5_apply_migration
```

### Scenario 3: Login Problem
```
1. Use mcp2_browser_navigate to login page
2. Use mcp2_browser_snapshot
3. Fill form using refs
4. Check mcp2_browser_network_requests
5. Check mcp2_browser_console_messages
6. If Supabase issue, switch to mcp5
7. Check auth logs with mcp5_get_logs
```

### Scenario 4: Context Preservation
```
1. At start of session, use mcp3_read_graph
2. During session, create entities for discoveries
3. Create relations between entities
4. Add observations for important facts
5. Search nodes when context is needed
```

## Anti-Patterns (Don't Do This)

❌ Guessing element selectors in Playwright  
✅ Always use snapshot refs

❌ Debugging code before checking RLS  
✅ Check advisors and RLS first

❌ Making many small file edits separately  
✅ Use multi_edit for multiple changes

❌ Testing only Super Admin role  
✅ Test all 7 user roles

❌ Forgetting to document discoveries  
✅ Create memories for important findings

❌ Skipping console/network checks  
✅ Always verify browser state

## Quick Reference

### TMPL Project Specifics

**Dev Server:**
```bash
npm run dev
# Runs on http://localhost:5173
```

**Test Accounts:**
```
superadmin@tmplescapade.my / super123
admin@tmplescapade.my / admin123
booking@tmplescapade.my / booking123
tourguide@tmplescapade.my / guide123
agent@tmplescapade.my / agent123
finance@tmplescapade.my / finance123
marketing@tmplescapade.my / marketing123
```

**Supabase:**
```
Project ID: vvrmfgealitetfgwsdeu
URL: https://vvrmfgealitetfgwsdeu.supabase.co
Tables: 23 (see COMPLETE_TABLE_LIST.md)
```

**Vercel:**
```
Production: https://tmpl-pi.vercel.app
Region: Singapore
```

## Efficiency Tips

1. **Parallel Operations:** Use mcp5 tools in parallel when possible
2. **Batch Testing:** Test multiple roles in one Playwright session
3. **Memory First:** Check memory graph before asking user for context
4. **Logs Last:** Only check logs after other debugging steps
5. **Screenshot Everything:** Visual documentation prevents confusion

## Success Metrics

You're using MCPs effectively when:
- ✅ Issues are resolved in < 5 tool calls
- ✅ Testing is automated with Playwright
- ✅ Database issues are caught by advisors
- ✅ Context is preserved across sessions
- ✅ Solutions are documented in memory
- ✅ All user roles are tested consistently
