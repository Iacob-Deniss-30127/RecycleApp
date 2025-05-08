export const validationRules = {
  required: (fieldName: string) => (value: any) =>
    !!value || `Field ${fieldName} is required`,

  maxLength: (fieldName: string, max: number) => (value: string) =>
    value.length <= max ||
    `Field ${fieldName} must be at most ${max} characters`,

  minLength: (fieldName: string, min: number) => (value: string) =>
    value.length >= min ||
    `Field ${fieldName} must be at least ${min} characters`,

  numberRange:
    (fieldName: string, min: number, max: number) => (value: number | null) =>
      (value != null && value >= min && value <= max) ||
      `${fieldName} must be between ${min} and ${max}`,

  phone: () => (value: string) =>
    /^\d{9,15}$/.test(value) || "Enter a valid phone number",
};
