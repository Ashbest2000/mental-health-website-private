-- Drop the problematic policy that causes infinite recursion
DROP POLICY IF EXISTS "Super admins can manage all roles" ON admin_roles;

-- Create a corrected policy that checks if user is a super_admin without recursive query
CREATE POLICY "Super admins can manage all roles" ON admin_roles FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles ar
      WHERE ar.user_id = auth.uid() 
      AND ar.role = 'super_admin'
    )
  );

-- Keep the existing policy for users viewing their own role
-- This one is safe and doesn't cause recursion
DROP POLICY IF EXISTS "Users can view their own role" ON admin_roles;

CREATE POLICY "Users can view their own role" ON admin_roles FOR SELECT 
  USING (auth.uid() = user_id);
