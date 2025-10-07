-- Seed mental health institutions in Dhaka
INSERT INTO institutions (name, type, address, area, phone, services, emergency_available) VALUES
('National Institute of Mental Health (NIMH)', 'hospital', 'Sher-e-Bangla Nagar, Dhaka-1207', 'Sher-e-Bangla Nagar', '+880-2-9120831', ARRAY['Psychiatry', 'Psychology', 'Counseling', 'Emergency Care'], TRUE),
('Bangabandhu Sheikh Mujib Medical University (BSMMU)', 'hospital', 'Shahbag, Dhaka-1000', 'Shahbag', '+880-2-9668690', ARRAY['Psychiatry', 'Psychology', 'Counseling'], TRUE),
('Dhaka Medical College Hospital', 'hospital', 'Secretariat Road, Dhaka-1000', 'Secretariat', '+880-2-9668690', ARRAY['Psychiatry', 'Emergency Care'], TRUE),
('Pabna Mental Hospital', 'hospital', 'Hemayetpur, Savar, Dhaka', 'Savar', '+880-2-7791045', ARRAY['Psychiatry', 'Long-term Care'], TRUE),
('Moner Bondhu Foundation', 'counseling_center', 'House 23, Road 3, Dhanmondi, Dhaka', 'Dhanmondi', '+880-1779-554391', ARRAY['Counseling', 'Crisis Support', 'Suicide Prevention'], FALSE),
('Kaan Pete Roi (Emotional Support Helpline)', 'hotline', 'Online Service', 'Online', '+880-2-5853305', ARRAY['Crisis Hotline', 'Emotional Support'], TRUE),
('Mind Aid', 'counseling_center', 'Gulshan, Dhaka', 'Gulshan', '+880-1847-040044', ARRAY['Counseling', 'Therapy'], FALSE),
('Shuchona Foundation', 'counseling_center', 'Banani, Dhaka', 'Banani', '+880-1777-675345', ARRAY['Counseling', 'Mental Health Awareness'], FALSE);

-- Seed mental health resources
INSERT INTO resources (title, description, category, content_url, language, tags) VALUES
('Understanding Depression', 'A comprehensive guide to recognizing and managing depression', 'guide', '/resources/depression-guide', 'en', ARRAY['depression', 'mental-health', 'self-help']),
('ADHD in Adults', 'Information about ADHD symptoms and management in adults', 'article', '/resources/adhd-adults', 'en', ARRAY['adhd', 'attention', 'focus']),
('Anxiety Management Techniques', 'Practical techniques for managing anxiety', 'guide', '/resources/anxiety-management', 'en', ARRAY['anxiety', 'coping', 'relaxation']),
('মানসিক স্বাস্থ্য বোঝা', 'মানসিক স্বাস্থ্য সম্পর্কে বাংলায় তথ্য', 'article', '/resources/mental-health-bn', 'bn', ARRAY['mental-health', 'bangla']),
('Emergency Helplines', 'List of crisis and emergency mental health helplines in Bangladesh', 'hotline', '/resources/helplines', 'en', ARRAY['emergency', 'crisis', 'hotline']),
('Meditation for Beginners', 'Simple meditation practices for mental wellness', 'guide', '/resources/meditation', 'en', ARRAY['meditation', 'mindfulness', 'wellness']);
