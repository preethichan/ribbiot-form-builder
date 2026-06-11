class FormRenderer {
  constructor(config) {
    this.config = config;
    this.formElement = document.getElementById('jobForm');
    this.fieldsContainer = document.getElementById('formFields');
    this.formData = {};
    this.init();
  }

  init() {
    this.renderFields();
    this.attachEventListeners();
  }

  renderFields() {
    this.fieldsContainer.innerHTML = '';
    
    this.config.fields.forEach(field => {
      // Check if field should be visible
      if (!this.shouldShowField(field)) {
        return;
      }

      const fieldWrapper = document.createElement('div');
      fieldWrapper.className = 'form-group';
      fieldWrapper.id = `field-${field.id}`;
      
      if (field.type === 'checkbox') {
        fieldWrapper.innerHTML = this.renderCheckboxField(field);
      } else if (field.type === 'select') {
        fieldWrapper.innerHTML = this.renderSelectField(field);
      } else if (field.type === 'textarea') {
        fieldWrapper.innerHTML = this.renderTextareaField(field);
      } else {
        fieldWrapper.innerHTML = this.renderInputField(field);
      }

      this.fieldsContainer.appendChild(fieldWrapper);
    });
  }

  shouldShowField(field) {
    if (!field.conditionShow) {
      return true;
    }

    const { fieldId, value } = field.conditionShow;
    const conditionField = document.getElementById(fieldId);
    
    if (!conditionField) {
      return false;
    }

    return conditionField.value === value;
  }

  renderInputField(field) {
    const required = field.required ? 'required' : '';
    const pattern = field.validation?.pattern ? `pattern="${field.validation.pattern}"` : '';
    
    return `
      <label for="${field.id}" class="form-label">${field.label}</label>
      <input 
        type="${field.type}" 
        id="${field.id}" 
        name="${field.id}"
        placeholder="${field.placeholder || ''}"
        ${required}
        ${pattern}
        class="form-input"
      />
      ${field.validation?.message ? `<span class="form-hint">${field.validation.message}</span>` : ''}
    `;
  }

  renderSelectField(field) {
    const required = field.required ? 'required' : '';
    const options = field.options
      .map(opt => `<option value="${opt.value}">${opt.label}</option>`)
      .join('');

    return `
      <label for="${field.id}" class="form-label">${field.label}</label>
      <select id="${field.id}" name="${field.id}" class="form-input" ${required}>
        ${options}
      </select>
    `;
  }

  renderTextareaField(field) {
    const required = field.required ? 'required' : '';
    
    return `
      <label for="${field.id}" class="form-label">${field.label}</label>
      <textarea 
        id="${field.id}" 
        name="${field.id}"
        placeholder="${field.placeholder || ''}"
        class="form-input"
        rows="4"
        ${required}
      ></textarea>
      ${field.validation?.message ? `<span class="form-hint">${field.validation.message}</span>` : ''}
    `;
  }

  renderCheckboxField(field) {
    const required = field.required ? 'required' : '';
    
    return `
      <div class="form-checkbox">
        <input 
          type="checkbox" 
          id="${field.id}" 
          name="${field.id}"
          class="form-input-checkbox"
          ${required}
        />
        <label for="${field.id}" class="form-label-checkbox">${field.label}</label>
      </div>
    `;
  }

  attachEventListeners() {
    // Re-render when conditional fields change
    const conditionalFields = this.config.fields
      .filter(f => f.conditionShow)
      .map(f => f.conditionShow.fieldId);
    
    const uniqueTriggers = [...new Set(conditionalFields)];
    
    uniqueTriggers.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) {
        field.addEventListener('change', () => this.renderFields());
      }
    });

    // Form submission
    this.formElement.addEventListener('submit', (e) => {
      this.handleSubmit(e);
    });

    // Validation on blur
    this.fieldsContainer.querySelectorAll('.form-input').forEach(input => {
      input.addEventListener('blur', (e) => {
        this.validateField(e.target);
      });
    });
  }

  validateField(field) {
    const fieldConfig = this.config.fields.find(f => f.id === field.id);
    
    if (!fieldConfig || !fieldConfig.validation) {
      return true;
    }

    const value = field.value.trim();
    const validation = fieldConfig.validation;

    if (validation.pattern) {
      const regex = new RegExp(validation.pattern);
      if (value && !regex.test(value)) {
        field.classList.add('form-input-error');
        return false;
      }
    }

    if (validation.minLength && value.length < validation.minLength) {
      field.classList.add('form-input-error');
      return false;
    }

    field.classList.remove('form-input-error');
    return true;
  }

  handleSubmit(e) {
    e.preventDefault();

    // Validate all visible fields
    let isValid = true;
    const visibleFields = this.config.fields.filter(f => this.shouldShowField(f));

    visibleFields.forEach(fieldConfig => {
      const field = document.getElementById(fieldConfig.id);
      if (field && !this.validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) {
      alert('Please fix the errors in the form.');
      return;
    }

    // Collect form data
    const formData = new FormData(this.formElement);
    const data = Object.fromEntries(formData);

    console.log('Form submitted:', data);
    alert('Form submitted successfully!\n\n' + JSON.stringify(data, null, 2));
  }
}

// Initialize form when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new FormRenderer(formConfig);
});
