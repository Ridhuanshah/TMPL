---
description: Test application using Playwright MCP
---

# Playwright Testing Workflow

Always use mcp-playwright (mcp2) for browser testing and troubleshooting.

## Setup

### 1. Start Development Server
// turbo
```bash
npm run dev
```

### 2. Wait for Server
Wait 3 seconds for Vite to start

### 3. Check if Playwright is Installed
If you get browser installation errors:
```
Use mcp2_browser_install to install browsers
```

## Testing Steps

### 1. Navigate to Application
```
Use mcp2_browser_navigate with url: http://localhost:5173
```

### 2. Take Snapshot
```
Use mcp2_browser_snapshot to get page structure
```

### 3. Test Login Flow
```
1. Navigate to login page
2. Fill email field (ref from snapshot)
3. Fill password field (ref from snapshot)
4. Click login button
5. Wait for dashboard to load
6. Take screenshot to verify
```

### 4. Test Admin Features
```
- Navigate through sidebar menu
- Test CRUD operations
- Verify forms work correctly
- Check data display
```

### 5. Test Different User Roles
```
Test all 7 roles:
- superadmin@tmplescapade.my / super123
- admin@tmplescapade.my / admin123
- booking@tmplescapade.my / booking123
- tourguide@tmplescapade.my / guide123
- agent@tmplescapade.my / agent123
- finance@tmplescapade.my / finance123
- marketing@tmplescapade.my / marketing123
```

### 6. Check Console Errors
```
Use mcp2_browser_console_messages to check for errors
```

### 7. Verify Network Requests
```
Use mcp2_browser_network_requests to check API calls
```

## Common Issues

### Issue: Page Not Loading
- Check if dev server is running
- Verify port 5173 is available
- Check console for errors

### Issue: Authentication Fails
- Verify Supabase connection
- Check RLS policies
- Review auth-context.tsx logic

### Issue: Data Not Displaying
- Check network requests
- Verify database queries
- Check console for errors

## Best Practices
- Always take snapshots before interactions
- Use refs from snapshots for precise element targeting
- Check console messages after each major action
- Take screenshots to document state
- Test on different browser sizes (mobile/desktop)
