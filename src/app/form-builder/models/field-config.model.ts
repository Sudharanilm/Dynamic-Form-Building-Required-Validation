export interface FieldConfig {
  type: string;       // Type of field (text, textarea, dropdown, checkbox, radio)
  label: string;      // Label for the field
  name: string;       // Unique name for the field
  placeholder: string; // Placeholder for the field
  required?: boolean; // Whether the field is required
  options?: string[];  // Options for dropdown or radio fields
}


