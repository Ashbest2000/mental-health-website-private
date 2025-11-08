-- Disable RLS on admin_roles table to prevent infinite recursion
-- The RLS policy was causing infinite recursion. We'll rely on application-level authorization instead.
-- For production, consider using a separate validation table or auth.users custom claims

-- Disable RLS on admin_roles
ALTER TABLE admin_roles DISABLE ROW LEVEL SECURITY;

-- Drop the problematic recursive policy
DROP POLICY IF EXISTS "Super admins can manage all roles" ON admin_roles;
DROP POLICY IF EXISTS "Users can view their own role" ON admin_roles;

-- Note: Access to admin_roles should be controlled at the application level
-- Check user role in your app before allowing admin operations
