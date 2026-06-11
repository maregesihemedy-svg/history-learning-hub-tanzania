// ============================================================================
// SITE CONFIGURATION
// ============================================================================

export const SITE_CONFIG = {
  name: 'History Learning Hub Tanzania',
  description: 'A modern web application for browsing, searching, and downloading History teaching and learning materials aligned with the Tanzanian Form I-VI curriculum.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  author: 'Sir Maregesi',
  email: 'sir.maregesi@example.com',
  phone: '+255 XXX XXX XXX',
  twitter: '@maregesi',
  github: 'https://github.com/maregesihemedy-svg',
  logo: '/logo.svg',
  favicon: '/favicon.ico',
  language: 'en',
  timezone: 'Africa/Dar_es_Salaam',
};

// ============================================================================
// FILE UPLOAD CONFIGURATION
// ============================================================================

export const UPLOAD_CONFIG = {
  maxFileSize: 104857600, // 100MB
  maxFileSizeMB: 100,
  allowedFileTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/zip',
    'application/x-zip-compressed',
  ],
  allowedExtensions: ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.zip'],
  totalStorageBytes: 107374182400, // 100GB
  storageBucket: 'materials',
};

// ============================================================================
// PAGINATION CONFIGURATION
// ============================================================================

export const PAGINATION_CONFIG = {
  defaultPerPage: 12,
  maxPerPage: 100,
  pageSizes: [6, 12, 24, 48],
};

// ============================================================================
// CACHE CONFIGURATION
// ============================================================================

export const CACHE_CONFIG = {
  materials: 5 * 60, // 5 minutes
  categories: 60 * 60, // 1 hour
  statistics: 30 * 60, // 30 minutes
  user: 10 * 60, // 10 minutes
  search: 5 * 60, // 5 minutes
};

// ============================================================================
// CATEGORIES
// ============================================================================

export const FORM_LEVELS = [
  { id: '1', name: 'Form I', slug: 'form-i', description: 'Form I (Ages 13-14)' },
  { id: '2', name: 'Form II', slug: 'form-ii', description: 'Form II (Ages 14-15)' },
  { id: '3', name: 'Form III', slug: 'form-iii', description: 'Form III (Ages 15-16)' },
  { id: '4', name: 'Form IV', slug: 'form-iv', description: 'Form IV (Ages 16-17)' },
  { id: '5', name: 'Form V', slug: 'form-v', description: 'Form V (Ages 17-18)' },
  { id: '6', name: 'Form VI', slug: 'form-vi', description: 'Form VI (Ages 18-19)' },
];

export const MATERIAL_TYPES = [
  { name: 'Lesson Notes', slug: 'lesson-notes' },
  { name: 'Schemes of Work', slug: 'schemes-of-work' },
  { name: 'Lesson Plans', slug: 'lesson-plans' },
  { name: 'Past Papers', slug: 'past-papers' },
  { name: 'Exam Questions', slug: 'exam-questions' },
  { name: 'Revision Materials', slug: 'revision-materials' },
  { name: 'Assignments', slug: 'assignments' },
  { name: 'Textbooks', slug: 'textbooks' },
  { name: 'Presentations', slug: 'presentations' },
  { name: 'Maps & Diagrams', slug: 'maps-diagrams' },
  { name: 'Historical Documents', slug: 'historical-documents' },
  { name: 'Video Guides', slug: 'video-guides' },
];

export const HISTORY_TOPICS = [
  { name: 'Ancient History', slug: 'ancient-history' },
  { name: 'Medieval History', slug: 'medieval-history' },
  { name: 'Modern History', slug: 'modern-history' },
  { name: 'African Civilizations', slug: 'african-civilizations' },
  { name: 'Tanzanian History', slug: 'tanzanian-history' },
  { name: 'Colonial Period', slug: 'colonial-period' },
  { name: 'Independence Movements', slug: 'independence-movements' },
  { name: 'World Wars', slug: 'world-wars' },
  { name: 'Cold War', slug: 'cold-war' },
  { name: 'Evolution of Man', slug: 'evolution-of-man' },
  { name: 'Development of Political Systems', slug: 'political-systems' },
  { name: 'Colonial Economy', slug: 'colonial-economy' },
  { name: 'Nationalism', slug: 'nationalism' },
  { name: 'Sources of Historical Information', slug: 'sources-history' },
];

// ============================================================================
// ROLE-BASED ACCESS CONTROL
// ============================================================================

export const RBAC = {
  admin: ['materials:create', 'materials:read', 'materials:update', 'materials:delete', 'users:read', 'users:delete', 'analytics:read', 'settings:read', 'settings:update'],
  teacher: ['materials:read', 'favorites:create', 'favorites:read', 'favorites:delete'],
  student: ['materials:read', 'downloads:create', 'favorites:create', 'favorites:read', 'favorites:delete'],
  visitor: ['materials:read'],
};

// ============================================================================
// TOAST MESSAGES
// ============================================================================

export const TOAST_MESSAGES = {
  success: {
    login: 'Successfully logged in!',
    signup: 'Account created successfully! Please verify your email.',
    logout: 'Successfully logged out.',
    upload: 'Material uploaded successfully!',
    delete: 'Material deleted successfully.',
    update: 'Material updated successfully.',
    favorite: 'Added to favorites.',
    unfavorite: 'Removed from favorites.',
  },
  error: {
    login: 'Invalid email or password.',
    signup: 'Failed to create account. Email may already be in use.',
    logout: 'Failed to logout.',
    upload: 'Failed to upload file. Please try again.',
    delete: 'Failed to delete material.',
    update: 'Failed to update material.',
    notFound: 'Material not found.',
    unauthorized: 'You do not have permission to perform this action.',
    serverError: 'Server error. Please try again later.',
    fileSize: 'File size exceeds maximum limit (100MB).',
    fileType: 'Invalid file type. Allowed types: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, ZIP.',
  },
  loading: {
    upload: 'Uploading file...',
    delete: 'Deleting material...',
    search: 'Searching...',
  },
};

// ============================================================================
// API ENDPOINTS
// ============================================================================

export const API_ENDPOINTS = {
  // Auth
  auth: {
    login: '/api/auth/login',
    signup: '/api/auth/signup',
    logout: '/api/auth/logout',
    me: '/api/auth/me',
    refresh: '/api/auth/refresh',
  },
  // Materials
  materials: {
    list: '/api/materials',
    search: '/api/materials/search',
    detail: (id: string) => `/api/materials/${id}`,
    create: '/api/materials',
    update: (id: string) => `/api/materials/${id}`,
    delete: (id: string) => `/api/materials/${id}`,
    download: (id: string) => `/api/materials/${id}/download`,
    similar: (id: string) => `/api/materials/${id}/similar`,
  },
  // Categories
  categories: {
    list: '/api/categories',
    byType: (type: string) => `/api/categories?type=${type}`,
  },
  // User
  user: {
    profile: '/api/user/profile',
    update: '/api/user/profile',
    favorites: '/api/user/favorites',
    downloads: '/api/user/downloads',
  },
  // Admin
  admin: {
    stats: '/api/admin/stats',
    uploads: '/api/admin/uploads',
    users: '/api/admin/users',
  },
};

// ============================================================================
// REGEX PATTERNS
// ============================================================================

export const REGEX_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  phone: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  url: /^https?:\/\/.+/,
};

// ============================================================================
// ERROR CODES
// ============================================================================

export const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  BAD_REQUEST: 'BAD_REQUEST',
  CONFLICT: 'CONFLICT',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  VIRUS_DETECTED: 'VIRUS_DETECTED',
  QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',
};

// ============================================================================
// HTTP STATUS CODES
// ============================================================================

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
};
