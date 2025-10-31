-- Mental Health Platform Schema
-- Clean version without special characters

CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  assessment_type TEXT NOT NULL,
  score INTEGER NOT NULL,
  severity_level TEXT,
  recommendations TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  mood TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS crisis_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS volunteers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  experience_level TEXT,
  availability TEXT,
  specialization TEXT,
  bio TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  language TEXT DEFAULT 'en',
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  content_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE crisis_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Create policies for user_profiles
CREATE POLICY IF NOT EXISTS "Users can view own profile" ON user_profiles FOR SELECT 
  USING (auth.uid() = id OR (auth.jwt() ->> 'role') = 'admin');

CREATE POLICY IF NOT EXISTS "Users can update own profile" ON user_profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can insert own profile" ON user_profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Create policies for assessments
CREATE POLICY IF NOT EXISTS "Users can view own assessments" ON assessments FOR SELECT 
  USING (auth.uid() = user_id OR (auth.jwt() ->> 'role') = 'admin');

CREATE POLICY IF NOT EXISTS "Users can create assessments" ON assessments FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policies for journal_entries
CREATE POLICY IF NOT EXISTS "Users can view own journal" ON journal_entries FOR SELECT 
  USING (auth.uid() = user_id OR (auth.jwt() ->> 'role') = 'admin');

CREATE POLICY IF NOT EXISTS "Users can manage own journal" ON journal_entries FOR ALL 
  USING (auth.uid() = user_id);

-- Create policies for crisis_alerts
CREATE POLICY IF NOT EXISTS "Admins can view all crisis alerts" ON crisis_alerts FOR SELECT 
  USING ((auth.jwt() ->> 'role') = 'admin');

CREATE POLICY IF NOT EXISTS "Users can create crisis alerts" ON crisis_alerts FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policies for volunteers
CREATE POLICY IF NOT EXISTS "Public can view verified volunteers" ON volunteers FOR SELECT 
  USING (is_verified = TRUE);

CREATE POLICY IF NOT EXISTS "Users can manage own profile" ON volunteers FOR ALL 
  USING (auth.uid() = user_id);

-- Create policies for resources
CREATE POLICY IF NOT EXISTS "Public can view resources" ON resources FOR SELECT 
  USING (TRUE);

CREATE POLICY IF NOT EXISTS "Admins can manage resources" ON resources FOR ALL 
  USING ((auth.jwt() ->> 'role') = 'admin');
