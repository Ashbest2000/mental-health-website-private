-- Users profile extension table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT,
  preferred_language TEXT DEFAULT 'en',
  is_volunteer BOOLEAN DEFAULT FALSE,
  volunteer_specialization TEXT,
  volunteer_availability TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Diagnostic test results
CREATE TABLE IF NOT EXISTS diagnostic_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  test_type TEXT NOT NULL, -- 'adhd', 'depression', 'anxiety'
  score INTEGER NOT NULL,
  severity TEXT, -- 'minimal', 'mild', 'moderate', 'severe'
  responses JSONB, -- Store all question responses
  recommendations TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Private journal entries
CREATE TABLE IF NOT EXISTS journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT NOT NULL,
  mood TEXT, -- 'great', 'good', 'okay', 'bad', 'terrible'
  is_encrypted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI chatbot conversation history
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL, -- 'user' or 'assistant'
  content TEXT NOT NULL,
  risk_level TEXT, -- 'none', 'low', 'medium', 'high', 'critical'
  flagged_for_review BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crisis alerts
CREATE TABLE IF NOT EXISTS crisis_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL, -- 'self_harm', 'suicide', 'severe_distress'
  severity TEXT NOT NULL, -- 'high', 'critical'
  message TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'assigned', 'resolved'
  assigned_volunteer_id UUID REFERENCES auth.users(id),
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mental health resources
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'article', 'video', 'guide', 'hotline'
  content_url TEXT,
  language TEXT DEFAULT 'en',
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mental health institutions in Dhaka
CREATE TABLE IF NOT EXISTS institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'hospital', 'clinic', 'counseling_center', 'hotline'
  address TEXT NOT NULL,
  area TEXT, -- Dhaka area/district
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone TEXT,
  email TEXT,
  website TEXT,
  services TEXT[],
  operating_hours TEXT,
  emergency_available BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE crisis_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for diagnostic_results
CREATE POLICY "Users can view own results" ON diagnostic_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own results" ON diagnostic_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for journal_entries
CREATE POLICY "Users can view own journal" ON journal_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own journal" ON journal_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own journal" ON journal_entries
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can delete own journal" ON journal_entries
  FOR DELETE USING (auth.uid() = id);

-- RLS Policies for chat_messages
CREATE POLICY "Users can view own messages" ON chat_messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own messages" ON chat_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for crisis_alerts
CREATE POLICY "Users can view own alerts" ON crisis_alerts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Volunteers can view assigned alerts" ON crisis_alerts
  FOR SELECT USING (
    auth.uid() = assigned_volunteer_id OR
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND is_volunteer = TRUE)
  );

CREATE POLICY "Users can create alerts" ON crisis_alerts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for resources (public read)
CREATE POLICY "Anyone can view resources" ON resources
  FOR SELECT USING (TRUE);

-- RLS Policies for institutions (public read)
CREATE POLICY "Anyone can view institutions" ON institutions
  FOR SELECT USING (TRUE);

-- Create indexes for better performance
CREATE INDEX idx_diagnostic_results_user_id ON diagnostic_results(user_id);
CREATE INDEX idx_journal_entries_user_id ON journal_entries(user_id);
CREATE INDEX idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX idx_crisis_alerts_user_id ON crisis_alerts(user_id);
CREATE INDEX idx_crisis_alerts_status ON crisis_alerts(status);
CREATE INDEX idx_institutions_area ON institutions(area);
