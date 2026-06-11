// ============================================================================
// USER TYPES
// ============================================================================

export type UserRole = 'admin' | 'teacher' | 'student' | 'visitor';

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone_number?: string;
  profile_image_url?: string;
  role: UserRole;
  is_active: boolean;
  is_verified: boolean;
  last_login_at?: string;
  login_count: number;
  created_at: string;
  updated_at: string;
}

export interface UserProfile extends User {
  total_downloads: number;
  total_favorites: number;
}

// ============================================================================
// MATERIAL TYPES
// ============================================================================

export type MaterialStatus = 'draft' | 'published' | 'archived';
export type FileType = 'pdf' | 'doc' | 'docx' | 'ppt' | 'pptx' | 'xls' | 'xlsx' | 'zip';

export interface Material {
  id: string;
  title: string;
  description?: string;
  slug: string;
  file_url: string;
  file_name: string;
  file_type: FileType;
  file_size_bytes: number;
  thumbnail_url?: string;
  status: MaterialStatus;
  form_level_id?: string;
  material_type_id?: string;
  history_topic_id?: string;
  created_by_id: string;
  view_count: number;
  download_count: number;
  favorites_count: number;
  is_virus_scanned: boolean;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface MaterialWithRelations extends Material {
  form_level?: Category;
  material_type?: Category;
  history_topic?: Category;
  created_by?: User;
  is_favorite?: boolean;
}

// ============================================================================
// CATEGORY TYPES
// ============================================================================

export type CategoryType = 'form_level' | 'material_type' | 'history_topic';

export interface Category {
  id: string;
  name: string;
  slug: string;
  category_type: CategoryType;
  description?: string;
  icon_name?: string;
  color_hex?: string;
  parent_id?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// DOWNLOAD & FAVORITES
// ============================================================================

export interface Download {
  id: string;
  material_id: string;
  user_id?: string;
  ip_address?: string;
  user_agent?: string;
  download_path?: string;
  download_size_bytes?: number;
  created_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  material_id: string;
  created_at: string;
}

// ============================================================================
// ACTIVITY LOG
// ============================================================================

export type ActivityType =
  | 'material_created'
  | 'material_updated'
  | 'material_deleted'
  | 'material_downloaded'
  | 'material_viewed'
  | 'material_favorited'
  | 'user_login'
  | 'user_signup'
  | 'admin_action';

export interface ActivityLog {
  id: string;
  user_id?: string;
  action: ActivityType;
  resource_type?: string;
  resource_id?: string;
  resource_name?: string;
  ip_address?: string;
  user_agent?: string;
  metadata?: Record<string, any>;
  created_at: string;
}

// ============================================================================
// STATISTICS
// ============================================================================

export interface Statistics {
  id: string;
  stat_date: string;
  total_materials: number;
  total_downloads: number;
  total_users: number;
  total_storage_bytes: number;
  new_materials_today: number;
  new_users_today: number;
  most_downloaded_material_id?: string;
  created_at: string;
}

export interface DashboardStats {
  total_materials: number;
  total_downloads: number;
  total_users: number;
  total_storage_used: number;
  total_storage_available: number;
  top_materials: Material[];
  recent_materials: Material[];
  recent_downloads: Download[];
  user_growth: { date: string; count: number }[];
  download_growth: { date: string; count: number }[];
}

// ============================================================================
// AUTH TYPES
// ============================================================================

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignUpData extends AuthCredentials {
  full_name: string;
  phone_number?: string;
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}

export interface Session {
  id: string;
  user_id: string;
  token_hash: string;
  expires_at: string;
  created_at: string;
  last_activity_at: string;
}

export interface AuthError {
  code: string;
  message: string;
  status: number;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  status: number;
  timestamp: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// ============================================================================
// FILTER & SEARCH TYPES
// ============================================================================

export interface MaterialFilter {
  search?: string;
  form_level_id?: string;
  material_type_id?: string;
  history_topic_id?: string;
  status?: MaterialStatus;
  sort_by?: 'recent' | 'popular' | 'downloads' | 'views';
  page?: number;
  per_page?: number;
}

export interface SearchQuery {
  q: string;
  filters?: MaterialFilter;
  limit?: number;
  offset?: number;
}

// ============================================================================
// FILE UPLOAD TYPES
// ============================================================================

export interface FileUploadPayload {
  file: File;
  title: string;
  description?: string;
  form_level_id: string;
  material_type_id: string;
  history_topic_id?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface UploadResponse {
  material: Material;
  file_url: string;
  message: string;
}

// ============================================================================
// STORAGE CONFIG
// ============================================================================

export interface StorageConfig {
  id: string;
  max_file_size_bytes: number;
  total_storage_bytes: number;
  used_storage_bytes: number;
  allowed_file_types: string[];
  created_at: string;
  updated_at: string;
}

// ============================================================================
// THEME TYPES
// ============================================================================

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  theme: Theme;
  colors: {
    primary: string;
    accent: string;
    neutral: string;
  };
}
