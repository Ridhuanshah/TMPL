---
description: Systematic approach to debugging Supabase issues
---

# Debug Supabase Issues Workflow

## Important: Always Check Infrastructure First!

Many "code bugs" are actually database/configuration issues.

## Debugging Checklist (In Order)

### 1. Check RLS Policies (MOST COMMON ISSUE)
**Symptoms:** Queries hang, data not loading, infinite loading states

**Solution:**
```
Use mcp5 tools to:
1. List tables: mcp5_list_tables
2. Execute test query: mcp5_execute_sql
3. Check advisors: mcp5_get_advisors (type: security)
```

**Fix:**
- Go to Supabase Dashboard > Authentication > Policies
- Ensure policies allow SELECT for authenticated users
- Add policies for INSERT, UPDATE, DELETE as needed

### 2. Verify Table Structure
**Check:**
- All required tables exist
- Column names match TypeScript types
- Data types are correct
- Foreign keys are set up

```
Use mcp5_list_tables with schemas: ['public']
Use mcp5_execute_sql to describe table structure
```

### 3. Verify Column Existence
**Common Issues:**
- Missing bio column in users table
- Mismatched column names (snake_case vs camelCase)

```sql
-- Check table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'your_table';
```

### 4. Check Supabase Configuration
- API URL is correct
- ANON KEY is valid
- Project is active
- Region matches deployment

```
Use mcp5_get_project with id: vvrmfgealitetfgwsdeu
```

### 5. Verify Vercel Environment Variables
```bash
# Check local .env
cat .env.supabase

# Verify in Vercel Dashboard
# Project Settings > Environment Variables
```

**Required variables:**
- VITE_SUPABASE_PROJECT_URL
- VITE_SUPABASE_ANON_KEY

### 6. Test Query Directly
```
Use mcp5_execute_sql to test queries directly
Example: SELECT * FROM users LIMIT 1;
```

### 7. Check Logs
```
Use mcp5_get_logs with:
- service: 'api' (for API logs)
- service: 'postgres' (for database logs)
- service: 'auth' (for authentication logs)
```

### 8. Review Code (Last Resort)
Only after infrastructure checks:
- Check SQL queries in code
- Verify table names
- Check column references
- Review joins and relationships

## Common Scenarios

### Scenario: Login Works, Data Doesn't Load
**Root Cause:** RLS policies blocking SELECT queries
**Fix:** Add RLS policy allowing authenticated users to SELECT

### Scenario: Settings Page Hangs
**Root Cause:** Query by email instead of user ID with RLS
**Fix:** Query by auth.uid() or user.id in WHERE clause

### Scenario: Create/Update Fails Silently
**Root Cause:** Missing INSERT/UPDATE RLS policies
**Fix:** Add appropriate RLS policies

### Scenario: Data Appears Locally, Not in Production
**Root Cause:** Missing Vercel environment variables
**Fix:** Add env vars to Vercel and redeploy

## Quick Test Script

```typescript
// Test file: src/test/supabase-health-check.ts
import { supabase } from './supabase-client';

async function healthCheck() {
  // 1. Test connection
  const { data, error } = await supabase
    .from('users')
    .select('count')
    .limit(1);
  
  console.log('Connection:', error ? 'FAILED' : 'OK');
  
  // 2. Test auth
  const { data: { user } } = await supabase.auth.getUser();
  console.log('Auth:', user ? 'OK' : 'NOT LOGGED IN');
  
  // 3. Test RLS
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user?.id)
    .single();
  
  console.log('RLS:', userError ? 'BLOCKED' : 'OK');
}
```

## When to Ask for Help
If after all checks you're still stuck:
1. Document what you've checked
2. Share error messages
3. Provide query examples
4. Ask user for Supabase dashboard access
