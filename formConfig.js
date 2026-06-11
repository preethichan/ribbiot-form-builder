const formConfig = {
  fields: [
    {
      id: "jobId",
      type: "text",
      label: "Job ID",
      placeholder: "JOB-2024-001",
      required: true,
      validation: {
        pattern: "^JOB-\\d{4}-\\d{3}$",
        message: "Format: JOB-YYYY-NNN"
      }
    },
    {
      id: "location",
      type: "text",
      label: "Job Location",
      placeholder: "Enter site address",
      required: true,
      validation: {
        minLength: 5,
        message: "Address must be at least 5 characters"
      }
    },
    {
      id: "startDate",
      type: "date",
      label: "Start Date",
      required: true
    },
    {
      id: "startTime",
      type: "time",
      label: "Start Time",
      required: true
    },
    {
      id: "equipmentType",
      type: "select",
      label: "Equipment Type",
      required: true,
      options: [
        { value: "", label: "Select equipment…" },
        { value: "mobile-crane", label: "Mobile crane (50–150 ton)" },
        { value: "tower-crane", label: "Tower crane" },
        { value: "rough-terrain", label: "Rough terrain crane" },
        { value: "all-terrain", label: "All terrain crane" }
      ]
    },
    {
      id: "heightRestriction",
      type: "text",
      label: "Height Restriction (meters)",
      placeholder: "Enter maximum height",
      required: true,
      validation: {
        pattern: "^\\d+(\\.\\d{1,2})?$",
        message: "Enter a valid number (e.g., 25.5)"
      },
      conditionShow: {
        fieldId: "equipmentType",
        value: "tower-crane"
      }
    },
    {
      id: "terrainType",
      type: "select",
      label: "Terrain Type",
      required: true,
      options: [
        { value: "", label: "Select terrain…" },
        { value: "paved", label: "Paved/hard surface" },
        { value: "soft-ground", label: "Soft ground" },
        { value: "uneven", label: "Uneven/rocky" }
      ],
      conditionShow: {
        fieldId: "equipmentType",
        value: "rough-terrain"
      }
    },
    {
      id: "jobDescription",
      type: "textarea",
      label: "Job Description",
      placeholder: "Describe the work to be performed…",
      required: true,
      validation: {
        minLength: 10,
        message: "Description must be at least 10 characters"
      }
    },
    {
      id: "operatorName",
      type: "text",
      label: "Operator Name",
      placeholder: "Enter operator name",
      required: true,
      validation: {
        minLength: 2,
        message: "Operator name must be at least 2 characters"
      }
    },
    {
      id: "operatorLicense",
      type: "text",
      label: "Operator License #",
      placeholder: "License number",
      required: true,
      validation: {
        minLength: 3,
        message: "License number must be at least 3 characters"
      }
    },
    {
      id: "safetyChecklistCompleted",
      type: "checkbox",
      label: "Safety checklist completed",
      required: true
    }
  ]
};
