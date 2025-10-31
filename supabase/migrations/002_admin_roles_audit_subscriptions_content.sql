-- Admin Roles, Audit, Subscriptions, and Content Schema
-- Clean version without special characters

CREATE TABLE IF NOT EXISTS admin_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'moderator', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, role)
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id UUID,
  changes JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  features TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_id UUID REFERENCES subscription_plans(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('guide', 'article', 'video')),
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_roles
CREATE POLICY IF NOT EXISTS "Super admins can manage all roles" ON admin_roles FOR ALL 
  USING ((auth.jwt() ->> 'role') = 'super_admin');

CREATE POLICY IF NOT EXISTS "Users can view their own role" ON admin_roles FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policies for audit_logs
CREATE POLICY IF NOT EXISTS "Admins can view audit logs" ON audit_logs FOR SELECT 
  USING ((auth.jwt() ->> 'role') IN ('super_admin', 'moderator'));

CREATE POLICY IF NOT EXISTS "Admins can create audit logs" ON audit_logs FOR INSERT 
  WITH CHECK ((auth.jwt() ->> 'role') IN ('super_admin', 'moderator'));

-- Create policies for subscription_plans
CREATE POLICY IF NOT EXISTS "Public can view subscription plans" ON subscription_plans FOR SELECT 
  USING (TRUE);

CREATE POLICY IF NOT EXISTS "Admins can manage subscription plans" ON subscription_plans FOR ALL 
  USING ((auth.jwt() ->> 'role') = 'super_admin');

-- Create policies for user_subscriptions
CREATE POLICY IF NOT EXISTS "Users can view own subscriptions" ON user_subscriptions FOR SELECT 
  USING (auth.uid() = user_id OR (auth.jwt() ->> 'role') = 'super_admin');

CREATE POLICY IF NOT EXISTS "Users can manage own subscriptions" ON user_subscriptions FOR ALL 
  USING (auth.uid() = user_id);

-- Create policies for content
CREATE POLICY IF NOT EXISTS "Public can view published content" ON content FOR SELECT 
  USING (is_published = TRUE);

CREATE POLICY IF NOT EXISTS "Authors can view their content" ON content FOR SELECT 
  USING (auth.uid() = author_id);

CREATE POLICY IF NOT EXISTS "Admins can manage all content" ON content FOR ALL 
  USING ((auth.jwt() ->> 'role') = 'super_admin');
