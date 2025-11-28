-- Seed data for development

-- Note: You need to create a user in Authentication first and replace 'USER_ID_HERE' with their UUID.
-- Since we can't know the user ID in advance, this seed file is a template.

-- Example Profile (You can run this after you sign up and get your user ID)
/*
INSERT INTO profiles (id, first_name, last_name, title, email, company, bio, completion_percentage)
VALUES 
  ('USER_ID_HERE', 'Victoria', 'Pavlov', 'Senior Family Advisor', 'victoria@example.com', 'Pavlov Advisory', 'Experienced family advisor specializing in governance and succession planning.', 75);
*/

-- Example Families (Linked to the user above)
/*
INSERT INTO families (advisor_id, name, members_count, role, payment_status, status, industry, location, description)
VALUES
  ('USER_ID_HERE', 'Roye Family', 8, 'personal-advisor', 'pending', 'active', 'Media & Entertainment', 'New York, NY', 'Multi-generational media conglomerate seeking governance restructuring.'),
  ('USER_ID_HERE', 'Harrington Family', 12, 'consultant', 'paid', 'active', 'Real Estate', 'Los Angeles, CA', 'Established real estate family transitioning to next generation leadership.');
*/

-- Example Notifications
/*
INSERT INTO notifications (user_id, type, title, description, read)
VALUES
  ('USER_ID_HERE', 'message', 'New Message from Roye Family', 'Logan sent you a message regarding the succession plan.', false),
  ('USER_ID_HERE', 'alert', 'Upcoming Meeting', 'Consultation with Harrington Family in 1 hour.', false);
*/
