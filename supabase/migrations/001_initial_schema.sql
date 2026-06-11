-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For full-text search

-- ============================================================================
-- ROLES & PERMISSIONS TABLE
-- ============================================================================
CREATE TYPE user_role AS ENUM ('admin', 'teacher', 'student', 'visitor');

CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name user_role NOT NULL UNIQUE,
  description TEXT,
  permissions JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- USERS TABLE
-- ============================================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  profile_image_url TEXT,
  role user_role NOT NULL DEFAULT 'student',
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  verification_token VARCHAR(255),
  verification_token_expires_at TIMESTAMP WITH TIME ZONE,
  password_hash VARCHAR(255),
  password_reset_token VARCHAR(255),
  password_reset_expires_at TIMESTAMP WITH TIME ZONE,
  last_login_at TIMESTAMP WITH TIME ZONE,
  login_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- ============================================================================
-- CATEGORIES TABLE (Material Types & Form Levels)
-- ============================================================================
CREATE TYPE category_type AS ENUM (
  'form_level',
  'material_type',
  'history_topic'
);

CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  category_type category_type NOT NULL,
  description TEXT,
  icon_name VARCHAR(100),
  color_hex VARCHAR(7),
  parent_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categories_type ON categories(category_type);
CREATE INDEX idx_categories_parent_id ON categories(parent_id);
CREATE INDEX idx_categories_slug ON categories(slug);

-- ============================================================================
-- MATERIALS TABLE (History Resources)
-- ============================================================================
CREATE TYPE material_status AS ENUM ('draft', 'published', 'archived');

CREATE TABLE materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  slug VARCHAR(255) NOT NULL UNIQUE,
  file_url TEXT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  thumbnail_url TEXT,
  status material_status DEFAULT 'published',
  
  -- Metadata
  form_level_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  material_type_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  history_topic_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  
  -- Author
  created_by_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Statistics
  view_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  favorites_count INTEGER DEFAULT 0,
  
  -- Virus scan
  is_virus_scanned BOOLEAN DEFAULT false,
  virus_scan_result JSONB,
  
  -- SEO
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords TEXT,
  
  -- Timestamps
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_materials_status ON materials(status);
CREATE INDEX idx_materials_form_level_id ON materials(form_level_id);
CREATE INDEX idx_materials_material_type_id ON materials(material_type_id);
CREATE INDEX idx_materials_history_topic_id ON materials(history_topic_id);
CREATE INDEX idx_materials_created_by_id ON materials(created_by_id);
CREATE INDEX idx_materials_created_at ON materials(created_at DESC);
CREATE INDEX idx_materials_download_count ON materials(download_count DESC);
CREATE INDEX idx_materials_title_search ON materials USING GIN(to_tsvector('english', title || ' ' || COALESCE(description, '')));

-- ============================================================================
-- DOWNLOADS TABLE (Download Tracking)
-- ============================================================================
CREATE TABLE downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  material_id UUID NOT NULL REFERENCES materials(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  ip_address INET,
  user_agent TEXT,
  download_path TEXT,
  download_size_bytes BIGINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_downloads_material_id ON downloads(material_id);
CREATE INDEX idx_downloads_user_id ON downloads(user_id);
CREATE INDEX idx_downloads_created_at ON downloads(created_at DESC);

-- ============================================================================
-- FAVORITES TABLE (User Bookmarks)
-- ============================================================================
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  material_id UUID NOT NULL REFERENCES materials(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(user_id, material_id)
);

CREATE INDEX idx_favorites_user_id ON favorites(user_id);
CREATE INDEX idx_favorites_material_id ON favorites(material_id);

-- ============================================================================
-- ACTIVITY LOG TABLE
-- ============================================================================
CREATE TYPE activity_type AS ENUM (
  'material_created',
  'material_updated',
  'material_deleted',
  'material_downloaded',
  'material_viewed',
  'material_favorited',
  'user_login',
  'user_signup',
  'admin_action'
);

CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action activity_type NOT NULL,
  resource_type VARCHAR(50),
  resource_id UUID,
  resource_name VARCHAR(255),
  ip_address INET,
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_action ON activity_logs(action);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at DESC);
CREATE INDEX idx_activity_logs_resource_id ON activity_logs(resource_id);

-- ============================================================================
-- STATISTICS TABLE (Pre-aggregated Stats)
-- ============================================================================
CREATE TABLE statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stat_date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_materials INTEGER DEFAULT 0,
  total_downloads INTEGER DEFAULT 0,
  total_users INTEGER DEFAULT 0,
  total_storage_bytes BIGINT DEFAULT 0,
  new_materials_today INTEGER DEFAULT 0,
  new_users_today INTEGER DEFAULT 0,
  most_downloaded_material_id UUID REFERENCES materials(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(stat_date)
);

CREATE INDEX idx_statistics_stat_date ON statistics(stat_date DESC);

-- ============================================================================
-- SESSIONS TABLE (Admin Sessions)
-- ============================================================================
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) NOT NULL UNIQUE,
  ip_address INET,
  user_agent TEXT,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);

-- ============================================================================
-- AUDIT LOG TABLE
-- ============================================================================
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  table_name VARCHAR(100),
  record_id UUID,
  old_data JSONB,
  new_data JSONB,
  changes JSONB,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_table_name ON audit_logs(table_name);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- ============================================================================
-- STORAGE LIMITS TABLE
-- ============================================================================
CREATE TABLE storage_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  max_file_size_bytes BIGINT DEFAULT 104857600, -- 100MB
  total_storage_bytes BIGINT DEFAULT 0,
  used_storage_bytes BIGINT DEFAULT 0,
  allowed_file_types TEXT[] DEFAULT ARRAY['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.zip'],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Users can see their own data
CREATE POLICY users_own_data ON users
  FOR SELECT USING (auth.uid() = id OR auth.jwt() ->> 'role' = 'admin');

-- Materials are visible to everyone when published
CREATE POLICY materials_public_view ON materials
  FOR SELECT USING (status = 'published' OR auth.jwt() ->> 'role' = 'admin');

-- Only admin can insert/update/delete materials
CREATE POLICY materials_admin_write ON materials
  FOR INSERT WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY materials_admin_update ON materials
  FOR UPDATE USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY materials_admin_delete ON materials
  FOR DELETE USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER materials_updated_at BEFORE UPDATE ON materials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER storage_config_updated_at BEFORE UPDATE ON storage_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Increment download count
CREATE OR REPLACE FUNCTION increment_download_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE materials SET download_count = download_count + 1 WHERE id = NEW.material_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER downloads_increment_count AFTER INSERT ON downloads
  FOR EACH ROW EXECUTE FUNCTION increment_download_count();

-- Increment/decrement favorites count
CREATE OR REPLACE FUNCTION increment_favorites_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE materials SET favorites_count = favorites_count + 1 WHERE id = NEW.material_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION decrement_favorites_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE materials SET favorites_count = GREATEST(0, favorites_count - 1) WHERE id = OLD.material_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER favorites_increment_count AFTER INSERT ON favorites
  FOR EACH ROW EXECUTE FUNCTION increment_favorites_count();

CREATE TRIGGER favorites_decrement_count AFTER DELETE ON favorites
  FOR EACH ROW EXECUTE FUNCTION decrement_favorites_count();

-- Increment view count
CREATE OR REPLACE FUNCTION increment_view_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.action = 'material_viewed' THEN
    UPDATE materials SET view_count = view_count + 1 WHERE id = NEW.resource_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER activity_increment_views AFTER INSERT ON activity_logs
  FOR EACH ROW EXECUTE FUNCTION increment_view_count();

-- ============================================================================
-- INITIAL DATA (Default Roles & Categories)
-- ============================================================================

INSERT INTO roles (name, description, permissions) VALUES
('admin', 'Administrator with full access', '{"materials": ["create", "read", "update", "delete"], "users": ["read", "update", "delete"], "analytics": ["read"], "settings": ["read", "update"]}'),
('teacher', 'Teacher with viewing and bookmarking access', '{"materials": ["read"], "favorites": ["create", "read", "delete"]}'),
('student', 'Student with viewing and downloading access', '{"materials": ["read"], "downloads": ["create"], "favorites": ["create", "read", "delete"]}'),
('visitor', 'Visitor with read-only access', '{"materials": ["read"]}')
ON CONFLICT (name) DO NOTHING;

-- Form Levels
INSERT INTO categories (name, slug, category_type, description, color_hex, sort_order) VALUES
('Form I', 'form-i', 'form_level', 'Form I (Ages 13-14)', '#003d99', 1),
('Form II', 'form-ii', 'form_level', 'Form II (Ages 14-15)', '#003d99', 2),
('Form III', 'form-iii', 'form_level', 'Form III (Ages 15-16)', '#003d99', 3),
('Form IV', 'form-iv', 'form_level', 'Form IV (Ages 16-17)', '#003d99', 4),
('Form V', 'form-v', 'form_level', 'Form V (Ages 17-18)', '#003d99', 5),
('Form VI', 'form-vi', 'form_level', 'Form VI (Ages 18-19)', '#003d99', 6)
ON CONFLICT (slug) DO NOTHING;

-- Material Types
INSERT INTO categories (name, slug, category_type, description, color_hex, sort_order) VALUES
('Lesson Notes', 'lesson-notes', 'material_type', 'Detailed lesson notes', '#ffc000', 1),
('Schemes of Work', 'schemes-of-work', 'material_type', 'Schemes of work', '#ffc000', 2),
('Lesson Plans', 'lesson-plans', 'material_type', 'Detailed lesson plans', '#ffc000', 3),
('Past Papers', 'past-papers', 'material_type', 'Previous exam papers', '#ffc000', 4),
('Exam Questions', 'exam-questions', 'material_type', 'Exam practice questions', '#ffc000', 5),
('Revision Materials', 'revision-materials', 'material_type', 'Revision guides', '#ffc000', 6),
('Assignments', 'assignments', 'material_type', 'Student assignments', '#ffc000', 7),
('Textbooks', 'textbooks', 'material_type', 'Full textbooks', '#ffc000', 8),
('Presentations', 'presentations', 'material_type', 'PowerPoint presentations', '#ffc000', 9),
('Maps & Diagrams', 'maps-diagrams', 'material_type', 'Historical maps and diagrams', '#ffc000', 10),
('Historical Documents', 'historical-documents', 'material_type', 'Primary historical sources', '#ffc000', 11),
('Video Guides', 'video-guides', 'material_type', 'Video learning materials', '#ffc000', 12)
ON CONFLICT (slug) DO NOTHING;

-- History Topics (Tanzanian Syllabus)
INSERT INTO categories (name, slug, category_type, description, color_hex, sort_order) VALUES
('Ancient History', 'ancient-history', 'history_topic', 'Ancient civilizations and empires', '#666', 1),
('Medieval History', 'medieval-history', 'history_topic', 'Medieval period history', '#666', 2),
('Modern History', 'modern-history', 'history_topic', 'Modern era history', '#666', 3),
('African Civilizations', 'african-civilizations', 'history_topic', 'African kingdoms and empires', '#666', 4),
('Tanzanian History', 'tanzanian-history', 'history_topic', 'History of Tanzania', '#666', 5),
('Colonial Period', 'colonial-period', 'history_topic', 'Colonial invasion and rule', '#666', 6),
('Independence Movements', 'independence-movements', 'history_topic', 'African independence struggles', '#666', 7),
('World Wars', 'world-wars', 'history_topic', 'World Wars I & II', '#666', 8),
('Cold War', 'cold-war', 'history_topic', 'Cold War period', '#666', 9),
('Evolution of Man', 'evolution-of-man', 'history_topic', 'Human evolution', '#666', 10),
('Development of Political Systems', 'political-systems', 'history_topic', 'Political system development', '#666', 11),
('Colonial Economy', 'colonial-economy', 'history_topic', 'Colonial economic systems', '#666', 12),
('Nationalism', 'nationalism', 'history_topic', 'Nationalist movements', '#666', 13),
('Sources of Historical Information', 'sources-history', 'history_topic', 'Historical sources and methods', '#666', 14)
ON CONFLICT (slug) DO NOTHING;

-- Initialize storage config
INSERT INTO storage_config (max_file_size_bytes, total_storage_bytes, used_storage_bytes) 
VALUES (104857600, 107374182400, 0) -- 100MB per file, 100GB total
ON CONFLICT DO NOTHING;

-- ============================================================================
-- VIEWS FOR COMMON QUERIES
-- ============================================================================

-- Most downloaded materials
CREATE OR REPLACE VIEW top_downloaded_materials AS
SELECT 
  id,
  title,
  file_name,
  download_count,
  view_count,
  created_at
FROM materials
WHERE status = 'published' AND deleted_at IS NULL
ORDER BY download_count DESC
LIMIT 20;

-- Recent materials
CREATE OR REPLACE VIEW recent_materials AS
SELECT 
  id,
  title,
  description,
  file_name,
  file_type,
  download_count,
  created_at
FROM materials
WHERE status = 'published' AND deleted_at IS NULL
ORDER BY created_at DESC
LIMIT 20;

-- User statistics
CREATE OR REPLACE VIEW user_stats AS
SELECT 
  u.id,
  u.email,
  u.full_name,
  u.role,
  COUNT(DISTINCT d.id) as total_downloads,
  COUNT(DISTINCT f.id) as total_favorites,
  u.created_at
FROM users u
LEFT JOIN downloads d ON u.id = d.user_id
LEFT JOIN favorites f ON u.id = f.user_id
WHERE u.deleted_at IS NULL
GROUP BY u.id, u.email, u.full_name, u.role, u.created_at;

COMMIT;
