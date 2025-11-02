---
description: Systematic approach to creating new features
---

# Create New Feature Workflow

## Planning Phase

### 1. Understand Requirements
- What is the feature?
- Who will use it (which user roles)?
- What data is needed?
- Integration points?

### 2. Check Existing Code
```bash
# Search for similar features
grep -r "similar_feature" src/
```

### 3. Design Approach
- UI components needed?
- New database tables/columns?
- API endpoints required?
- State management approach?

## Implementation Phase

### 1. Database Changes (If Needed)

#### Create Migration
```sql
-- File: migrations/YYYYMMDD_feature_name.sql
ALTER TABLE table_name ADD COLUMN new_column VARCHAR(255);
```

#### Apply Migration
```
Use mcp5_apply_migration with:
- name: "feature_name"
- project_id: "vvrmfgealitetfgwsdeu"
- query: [SQL from above]
```

#### Update TypeScript Types
```bash
npx supabase gen types typescript --project-id vvrmfgealitetfgwsdeu > src/types/supabase.types.ts
```

### 2. Create Service Layer

#### File: `src/polymet/services/feature-service.ts`
```typescript
import { supabase } from './supabase-client';

export const featureService = {
  async getAll() {
    const { data, error } = await supabase
      .from('feature_table')
      .select('*');
    if (error) throw error;
    return data;
  },
  
  async create(payload) {
    const { data, error } = await supabase
      .from('feature_table')
      .insert(payload)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  
  // Add update, delete, etc.
};
```

### 3. Create UI Components

#### Page Component: `src/polymet/pages/FeaturePage.tsx`
```typescript
import { useState, useEffect } from 'react';
import { featureService } from '../services/feature-service';

export function FeaturePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadData();
  }, []);
  
  async function loadData() {
    try {
      const result = await featureService.getAll();
      setData(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div>
      {/* Your UI here */}
    </div>
  );
}
```

### 4. Add Route

#### File: `src/App.tsx`
```typescript
import { FeaturePage } from './polymet/pages/FeaturePage';

// Add to routes
<Route path="/feature" element={<FeaturePage />} />
```

### 5. Add Navigation

#### File: `src/polymet/components/Sidebar.tsx`
```typescript
// Add menu item
{
  title: "Feature Name",
  icon: IconName,
  path: "/feature",
  roles: ['super_admin', 'admin'], // Specify allowed roles
}
```

## Testing Phase

### 1. Test with Playwright
```
Use mcp2 (Playwright) to:
1. Navigate to new feature page
2. Test all CRUD operations
3. Verify data displays correctly
4. Test error handling
5. Test with different user roles
```

### 2. Test Database
```
Use mcp5_execute_sql to:
- Verify data is saved correctly
- Check relationships
- Verify constraints
```

### 3. Manual Testing
- Test in browser
- Check console for errors
- Test responsive design
- Test with different user roles

## Documentation Phase

### 1. Update Documentation
Create/update: `docs/FEATURE_NAME.md`
```markdown
# Feature Name

## Purpose
[Describe feature]

## User Roles
[List allowed roles]

## Database Schema
[Tables and columns]

## API Endpoints
[Service methods]

## UI Components
[List components]

## Testing
[How to test]
```

### 2. Add to Project Documentation
Update PROJECT_DOCUMENTATION.md with feature details

## Deployment Phase

### 1. Test Locally
```bash
npm run build
npm run preview
```

### 2. Commit Changes
```bash
git add .
git commit -m "feat: Add [feature name]"
git push
```

### 3. Deploy to Production
Vercel will auto-deploy on push

### 4. Verify Production
- Test on live URL
- Check database operations
- Verify with real users

## Checklist
- [ ] Database schema updated
- [ ] TypeScript types generated
- [ ] Service layer created
- [ ] UI components created
- [ ] Route added
- [ ] Navigation updated
- [ ] RLS policies added
- [ ] Tested with Playwright
- [ ] Manual testing completed
- [ ] Documentation updated
- [ ] Code committed
- [ ] Deployed to production
- [ ] Production testing completed
