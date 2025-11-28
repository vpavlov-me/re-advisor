-- Seed data for service_types taxonomy
-- These are the main advisory service categories

INSERT INTO service_types (name, description, icon, category, sort_order) VALUES
-- Financial Services
('Tax Planning', 'Strategic tax optimization and compliance planning', 'Calculator', 'financial', 1),
('Investment Advisory', 'Portfolio management and investment strategy', 'TrendingUp', 'financial', 2),
('Wealth Management', 'Comprehensive wealth preservation and growth strategies', 'Wallet', 'financial', 3),
('Retirement Planning', 'Long-term retirement income and savings strategies', 'Sunset', 'financial', 4),
('Risk Management', 'Insurance and risk mitigation strategies', 'Shield', 'financial', 5),

-- Legal Services
('Estate Planning', 'Wills, trusts, and estate transfer planning', 'FileText', 'legal', 10),
('Trust Administration', 'Management and administration of family trusts', 'Building', 'legal', 11),
('Corporate Governance', 'Business structure and governance advisory', 'Briefcase', 'legal', 12),
('Succession Planning', 'Business and leadership succession strategies', 'Users', 'legal', 13),
('Philanthropic Planning', 'Charitable giving and foundation setup', 'Heart', 'legal', 14),

-- Family Services
('Family Governance', 'Family constitution and governance frameworks', 'Home', 'family', 20),
('Next Generation Education', 'Financial literacy and leadership for heirs', 'GraduationCap', 'family', 21),
('Family Meeting Facilitation', 'Facilitation of family councils and meetings', 'MessageCircle', 'family', 22),
('Conflict Resolution', 'Mediation and conflict management', 'Scale', 'family', 23),
('Family Office Setup', 'Establishing and managing family offices', 'Building2', 'family', 24),

-- Business Services
('Business Advisory', 'Strategic business consulting and planning', 'BarChart', 'business', 30),
('M&A Advisory', 'Mergers, acquisitions, and divestitures', 'GitMerge', 'business', 31),
('Exit Planning', 'Business exit and transition strategies', 'LogOut', 'business', 32),
('Capital Raising', 'Fundraising and capital structure advisory', 'DollarSign', 'business', 33),
('Operational Consulting', 'Business process and efficiency optimization', 'Settings', 'business', 34),

-- Personal Services
('Concierge Services', 'High-touch personal and lifestyle management', 'Star', 'personal', 40),
('Real Estate Advisory', 'Property investment and management guidance', 'Home', 'personal', 41),
('Art & Collectibles', 'Fine art and collectibles advisory', 'Image', 'personal', 42),
('Travel Planning', 'Luxury travel and experience planning', 'Plane', 'personal', 43),
('Security Consulting', 'Personal and family security advisory', 'Lock', 'personal', 44)

ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  updated_at = NOW();
