-- Insert sample mental health resources for Dhaka, Bangladesh

INSERT INTO resources (title, description, category, language, tags, content_url) VALUES
-- Guides
('Understanding Depression', 'A comprehensive guide to recognizing and managing depression symptoms. Learn about causes, treatments, and coping strategies.', 'guide', 'en', ARRAY['depression', 'mental-health', 'self-help'], 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/depression/'),
('Anxiety Management Techniques', 'Practical techniques to manage anxiety including breathing exercises, mindfulness, and cognitive behavioral strategies.', 'guide', 'en', ARRAY['anxiety', 'coping', 'techniques'], 'https://www.anxietycanada.com/'),
('ADHD in Adults', 'Understanding ADHD symptoms in adults and strategies for managing attention and focus challenges.', 'guide', 'en', ARRAY['adhd', 'adults', 'focus'], 'https://www.chadd.org/'),

-- Articles
('Mental Health in Bangladesh', 'An overview of mental health services and resources available in Bangladesh.', 'article', 'en', ARRAY['bangladesh', 'mental-health', 'resources'], 'https://www.who.int/countries/bgd/'),
('The Impact of Social Support on Mental Health', 'Research on how social connections and support networks improve mental health outcomes.', 'article', 'en', ARRAY['social-support', 'mental-health', 'research'], 'https://www.apa.org/'),

-- Hotlines
('National Mental Health Helpline', 'Available 24/7 for mental health support and crisis intervention in Bangladesh.', 'hotline', 'en', ARRAY['crisis', 'support', 'helpline'], 'tel:+880-2-9666-444'),
('Befrienders Bangladesh', 'Emotional support and suicide prevention helpline available round the clock.', 'hotline', 'en', ARRAY['crisis', 'suicide-prevention', 'support'], 'https://www.befriendersbangladesh.org/'),

-- Videos
('Meditation for Beginners', 'A beginner-friendly guided meditation video to help reduce stress and anxiety.', 'video', 'en', ARRAY['meditation', 'relaxation', 'stress-relief'], 'https://www.youtube.com/watch?v=meditation-beginners'),
('Mental Health Awareness Talk', 'An informative talk about mental health awareness and breaking stigma in communities.', 'video', 'en', ARRAY['awareness', 'stigma', 'education'], 'https://www.youtube.com/watch?v=mental-health-talk');
