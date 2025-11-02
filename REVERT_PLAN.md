# REVERT PLAN

## Files to Revert:

1. `/src/polymet/components/auth-context.tsx` - Remove all my logging and changes
2. `/src/polymet/pages/login.tsx` - Revert navigation changes
3. `/src/polymet/pages/settings.tsx` - Keep the toast changes (they're good)

## Original Working Logic:

The auth-context should:
- Use `getSession()` on mount
- Listen to auth state changes
- Keep it simple

The login page should:
- Use useEffect to watch `isAuthenticated`
- Navigate when it changes

## Status:
Since there's no git repo, I'll manually recreate the working version based on the original pattern.
