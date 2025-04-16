import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styles: [`
    .w-100 { width: 100%; }
    .mt-3 { margin-top: 1rem; }
    .mb-3 { margin-bottom: 1rem; }
    .mb-4 { margin-bottom: 1.5rem; }
    .p-3 { padding: 1rem; }
    .border {
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .rounded {
      border-radius: 5px;
    }
  `]
  
  // styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent {
  fieldType = 'text';
  previewMode = false;
  fieldList: any[] = [];
  form: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {}

  togglePreview() {
    this.previewMode = !this.previewMode;
    if (this.previewMode) this.buildForm();
  }

  addField() {
    const field = {
      type: this.fieldType,
      label: '',
      placeholder: '',
      required: false,
      minlength: 0,
      maxlength: 0,
      options: this.fieldType === 'dropdown' || this.fieldType === 'radio' ? ['Option 1', 'Option 2'] : [],
      name: `field_${Date.now()}`,
    };
    this.fieldList.push(field);
  }

  updateFieldConfig(index: number) {
    if (this.previewMode) this.buildForm();
  }

  removeField(index: number) {
    this.fieldList.splice(index, 1);
    if (this.previewMode) this.buildForm();
  }

  buildForm() {
    const group: any = {};
    this.fieldList.forEach(field => {
      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.minlength > 0) validators.push(Validators.minLength(field.minlength));
      if (field.maxlength > 0) validators.push(Validators.maxLength(field.maxlength));
      group[field.name] = this.fb.control('', validators);
    });
    this.form = this.fb.group(group);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
      alert('✅ Form submitted successfully!');
      this.form.reset();
      this.previewMode = false;
    }
  }
}
