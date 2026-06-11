import { FileUploadPayload } from '@/types';
import { UPLOAD_CONFIG, REGEX_PATTERNS } from '@/config/constants';

/**
 * Validate email
 */
export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required';
  if (!REGEX_PATTERNS.email.test(email)) return 'Invalid email format';
  return null;
};

/**
 * Validate password
 */
export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!REGEX_PATTERNS.password.test(password)) {
    return 'Password must contain uppercase, lowercase, number, and special character';
  }
  return null;
};

/**
 * Validate full name
 */
export const validateFullName = (name: string): string | null => {
  if (!name) return 'Full name is required';
  if (name.length < 2) return 'Full name must be at least 2 characters';
  if (name.length > 255) return 'Full name must not exceed 255 characters';
  return null;
};

/**
 * Validate file upload
 */
export const validateFileUpload = (file: File): string | null => {
  if (!file) return 'File is required';

  if (file.size > UPLOAD_CONFIG.maxFileSize) {
    return `File size exceeds maximum limit (${UPLOAD_CONFIG.maxFileSizeMB}MB)`;
  }

  if (!UPLOAD_CONFIG.allowedFileTypes.includes(file.type)) {
    return 'Invalid file type. Allowed types: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, ZIP';
  }

  return null;
};

/**
 * Validate material upload payload
 */
export const validateMaterialUpload = (payload: FileUploadPayload): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Validate file
  const fileError = validateFileUpload(payload.file);
  if (fileError) errors.file = fileError;

  // Validate title
  if (!payload.title) errors.title = 'Title is required';
  if (payload.title && payload.title.length < 3) errors.title = 'Title must be at least 3 characters';
  if (payload.title && payload.title.length > 255) errors.title = 'Title must not exceed 255 characters';

  // Validate description
  if (payload.description && payload.description.length > 1000) {
    errors.description = 'Description must not exceed 1000 characters';
  }

  // Validate form level
  if (!payload.form_level_id) errors.form_level_id = 'Form level is required';

  // Validate material type
  if (!payload.material_type_id) errors.material_type_id = 'Material type is required';

  // Validate SEO title
  if (payload.seo_title && payload.seo_title.length > 255) {
    errors.seo_title = 'SEO title must not exceed 255 characters';
  }

  // Validate SEO description
  if (payload.seo_description && payload.seo_description.length > 160) {
    errors.seo_description = 'SEO description must not exceed 160 characters';
  }

  return errors;
};

/**
 * Validate search query
 */
export const validateSearchQuery = (query: string): string | null => {
  if (!query) return 'Search query is required';
  if (query.length < 2) return 'Search query must be at least 2 characters';
  if (query.length > 255) return 'Search query must not exceed 255 characters';
  return null;
};

/**
 * Sanitize input
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>"']/g, (match) => {
      const escapeMap: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
      };
      return escapeMap[match] || match;
    });
};
