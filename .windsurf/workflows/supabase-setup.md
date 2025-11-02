---
description: Connect and configure Supabase database
---

# Supabase Setup Workflow

## Prerequisites
- Supabase account created
- Project ID: vvrmfgealitetfgwsdeu
- Environment variables in .env file

## Steps

### 1. Verify Supabase Connection
```bash
# Check environment variables
cat .env.supabase
```

### 2. Test Database Connection
```bash
# Using psql or Supabase SQL Editor
# Verify all 23 tables exist
```

### 3. Check RLS Policies
- Navigate to Supabase Dashboard > Authentication > Policies
- Verify policies for:
  - users table
  - packages table
  - bookings table
  - reviews table
  - coupons table

### 4. Generate TypeScript Types
```bash
npx supabase gen types typescript --project-id vvrmfgealitetfgwsdeu > src/types/supabase.types.ts
```

### 5. Test API Calls
- Create test file: `src/test/supabase-connection.test.ts`
- Run basic CRUD operations
- Verify authentication flow

### 6. Verify Environment Variables in Vercel
- Go to Vercel Dashboard > Project Settings > Environment Variables
- Add: VITE_SUPABASE_PROJECT_URL
- Add: VITE_SUPABASE_ANON_KEY
- Redeploy

## Troubleshooting
- If queries hang: Check RLS policies first
- If connection fails: Verify API keys
- If data missing: Check table structure matches schema

## References
- Database: https://vvrmfgealitetfgwsdeu.supabase.co
- Documentation: MIGRATION_COMPLETE.md
- Schema: DATABASE_SCHEMA_FINAL.sql
