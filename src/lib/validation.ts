// Validation utilities

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^09\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < 6) {
    return { isValid: false, message: 'رمز عبور باید حداقل 6 کاراکتر باشد' };
  }
  return { isValid: true };
};

export const validateRequired = (value: string, fieldName: string): { isValid: boolean; message?: string } => {
  if (!value.trim()) {
    return { isValid: false, message: `${fieldName} الزامی است` };
  }
  return { isValid: true };
};

export const validateFileSize = (file: File, maxSizeMB: number = 5): { isValid: boolean; message?: string } => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return { isValid: false, message: `حجم فایل نباید بیشتر از ${maxSizeMB} مگابایت باشد` };
  }
  return { isValid: true };
};

export const validateFileType = (file: File, allowedTypes: string[] = ['image/jpeg', 'image/png']): { isValid: boolean; message?: string } => {
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, message: 'فرمت فایل مجاز نیست. فقط JPG و PNG قابل قبول است' };
  }
  return { isValid: true };
};

export const validateForm = (data: Record<string, any>, rules: Record<string, (value: any) => { isValid: boolean; message?: string }>): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  let isValid = true;

  for (const [field, validator] of Object.entries(rules)) {
    const result = validator(data[field]);
    if (!result.isValid) {
      errors[field] = result.message || 'مقدار نامعتبر';
      isValid = false;
    }
  }

  return { isValid, errors };
};
