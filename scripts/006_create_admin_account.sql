-- Create a super admin account
-- To create an admin account, follow these steps:
-- 1. Sign up a new account at /auth/signup with your desired email and password
-- 2. Run the following SQL in your Supabase SQL editor to make that user an admin:

-- Replace 'admin@mentalhealth.com' with the email of the user you want to make admin
WITH admin_user AS (
  SELECT id FROM auth.users WHERE email = 'admin@mentalhealth.com'
)
INSERT INTO admin_roles (user_id, role)
SELECT id, 'super_admin' FROM admin_user
ON CONFLICT (user_id, role) DO NOTHING;

-- Verify the admin role was created
SELECT ar.user_id, ar.role, u.email 
FROM admin_roles ar
JOIN auth.users u ON ar.user_id = u.id
WHERE ar.role = 'super_admin';
