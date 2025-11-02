-- Enable RLS on users table (if not already enabled)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own profile" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;
DROP POLICY IF EXISTS "Allow public read for authenticated users" ON users;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view their own profile"
ON users
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update their own profile"
ON users
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Policy: Allow authenticated users to read user data (for admin purposes)
CREATE POLICY "Allow authenticated users to read profiles"
ON users
FOR SELECT
TO authenticated
USING (true);

-- Grant necessary permissions
GRANT SELECT, UPDATE ON users TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;
