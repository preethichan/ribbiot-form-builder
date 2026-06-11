# Crane Job Assignment Form

A dynamic, data-driven form system built with vanilla HTML/CSS/JavaScript, demonstrating clean architecture, conditional field logic, and client-side validation.

## Overview

This project showcases a production-ready form built for physical operations companies (e.g., crane service providers). The form dynamically shows/hides fields based on equipment type selection, validates input in real-time, and uses JSON configuration to separate concerns.

### Key Features

- **JSON-Driven**: Form structure defined in `formConfig.js` — easy to modify fields without touching HTML
- **Conditional Logic**: Fields appear/disappear based on user selections (e.g., "Height Restriction" only shows for tower cranes)
- **Client-Side Validation**: Pattern matching, min-length checks, and real-time feedback
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Clean Architecture**: Separation of concerns (config, rendering, styling)

## Project Structure

```
ribbiot-form-builder/
├── index.html          # Main HTML structure
├── formConfig.js       # JSON form definition (fields, validation, conditions)
├── formRenderer.js     # Form rendering engine with conditional logic
├── styles.css          # Responsive styling
└── README.md           # This file
```

## How It Works

### 1. Form Configuration (`formConfig.js`)

The form is defined entirely in JSON:

```javascript
{
  id: "equipmentType",
  type: "select",
  label: "Equipment Type",
  required: true,
  options: [
    { value: "tower-crane", label: "Tower crane" },
    { value: "mobile-crane", label: "Mobile crane (50–150 ton)" }
  ]
}
```

Fields can specify conditional visibility:

```javascript
{
  id: "heightRestriction",
  label: "Height Restriction",
  conditionShow: {
    fieldId: "equipmentType",
    value: "tower-crane"  // Only show if equipment type = tower crane
  }
}
```

### 2. Smart Rendering (`formRenderer.js`)

The `FormRenderer` class:

- Reads the JSON config and dynamically builds HTML
- Listens for field changes and re-renders conditional fields
- Validates input against patterns and rules
- Collects form data on submit

**Key methods:**

- `shouldShowField()`: Determines if a field should be visible
- `renderFields()`: Builds HTML for all visible fields
- `validateField()`: Checks validation rules
- `handleSubmit()`: Processes form submission

### 3. Styling (`styles.css`)

- Flat, modern design (no gradients/shadows)
- Focus states and error states for accessibility
- Mobile-responsive with max-width constraint
- Smooth animations for conditional field appearance

## Usage

### For Users

1. Open `index.html` in a browser
2. Select an equipment type
3. Watch conditional fields appear/disappear automatically
4. Fill in the form with valid data
5. Click Submit

### For Developers

To add a new field, edit `formConfig.js`:

```javascript
{
  id: "certifications",
  type: "text",
  label: "Certifications",
  required: true,
  validation: {
    minLength: 5,
    message: "Certifications must be at least 5 characters"
  }
}
```

To add conditional visibility:

```javascript
conditionShow: {
  fieldId: "equipmentType",
  value: "mobile-crane"
}
```

## Validation Rules

The form supports:

- **Pattern matching**: Regex validation (e.g., Job ID format: `JOB-YYYY-NNN`)
- **Min/max length**: Enforce field length constraints
- **Required fields**: Standard HTML5 `required` attribute
- **Real-time feedback**: Validation hints displayed below each field

Example:

```javascript
validation: {
  pattern: "^JOB-\\d{4}-\\d{3}$",
  message: "Format: JOB-YYYY-NNN"
}
```

## Design Decisions

### Why JSON Configuration?

At Ribbiot, form requirements change frequently. Using JSON separates **what fields exist** from **how they're rendered**. This means:

- Non-engineers can modify fields
- Forms scale as customer requirements grow
- Adding conditional logic doesn't require code changes

### Why Vanilla JavaScript?

For entry-level, vanilla JS demonstrates:

- Core JavaScript mastery (DOM manipulation, event listeners, closures)
- No framework overhead
- Clear, readable logic
- Easy to extend with React/Vue later

### Why This Structure?

The renderer is a **class-based** system that mirrors production patterns:

- Easy to unit test (each method has a single responsibility)
- Extensible (add new field types by extending `renderFields()`)
- Predictable (pure functions for config → HTML)

## Future Enhancements

Potential next steps (production-ready):

- **Server-side submission**: POST form data to backend API
- **Field dependencies**: Chain multiple conditions (if A and B, then show C)
- **Async validation**: Check if Job ID already exists
- **File uploads**: Add image/document fields
- **Multi-step forms**: Split into sections with progress indicators

## Testing the Form

### Test Case 1: Conditional Fields
1. Select "Tower crane" → "Height Restriction" appears
2. Select "Rough terrain crane" → "Terrain Type" appears
3. Select "Mobile crane" → Both hidden

### Test Case 2: Validation
1. Leave "Job ID" empty → Required error
2. Enter invalid Job ID (e.g., "invalid") → Pattern error
3. Enter valid Job ID (e.g., "JOB-2024-001") → Passes

### Test Case 3: Submission
1. Fill all visible required fields
2. Click Submit → Shows collected data

## Tech Stack

- **HTML5**: Semantic structure
- **CSS3**: Responsive design, animations
- **Vanilla JavaScript (ES6)**: No dependencies
- **Git**: Version control

## Why This Project

This demonstrates:

✅ **Entry-level competency**: Clean HTML/CSS/JS, responsive design
✅ **Growth mindset**: Data-driven architecture, separation of concerns
✅ **Production thinking**: Validation, error handling, user feedback
✅ **Scalability**: Easy to add fields, extend logic, migrate to framework later

Not over-engineered, but thoughtfully structured.

---

Built for the **Ribbiot Solutions Engineer** position. Questions? Check the code or reach out!
