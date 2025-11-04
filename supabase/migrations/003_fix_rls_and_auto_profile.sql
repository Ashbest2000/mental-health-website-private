-- Drop problematic policies
DROP POLICY IF EXISTS "Super admins can manage all roles" ON admin_roles;
DROP POLICY IF EXISTS "Users can view their own role" ON admin_roles;

-- Recreate admin_roles policies without recursion
CREATE POLICY "Super admins can manage all roles" ON admin_roles FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles ar 
      WHERE ar.user_id = auth.uid() 
      AND ar.role = 'super_admin'
    )
  );

CREATE POLICY "Users can view their own role" ON admin_roles FOR SELECT 
  USING (auth.uid() = user_id);

-- Create function to auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data ->> 'full_name', 'User'))
  ON CONFLICT (id) DO UPDATE SET updated_at = CURRENT_TIMESTAMP;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger for new user signups
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
