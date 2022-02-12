import { Grid, TextField, Typography } from "@mui/material";
import { Field, FieldType } from "@rowy/form-builder";
import MultiSelect from "@rowy/multiselect";
const type = null;
export const conditionSettings = (type: string) =>
  [
    {
      step: "dataType",
      type: FieldType.singleSelect,
      name: "dataType",
      label: "Selected Data Type",
      labelPlural: "sections",
      options: [
        { label: "Boolean", value: "boolean" },
        { label: "Number", value: "number" },
        { label: "String", value: "string" },
        { label: "Undefined", value: "undefined" },
        { label: "Null", value: "null" },
      ],
      multiple: false,
      defaultValue: "null",
      freeText: true,
      required: true,
    },
    type === "boolean"
      ? {
          step: "select_boolean",
          type: FieldType.multiSelect,
          name: "boolean",
          options: [
            { label: "True", value: "true" },
            { label: "False", value: "false" },
          ],
          defaultValue: "false",
          label: "Select condition value",
          required: true,
          minRows: 2,
        }
      : null,
    type === "boolean"
      ? {
          step: "select_number",
          type: FieldType.multiSelect,
          name: "number",
          multiple: false,
          options: [
            { label: "True", value: "true" },
            { label: "False", value: "false" },
          ],
          label: "Select condition value",
          required: true,
          minRows: 2,
        }
      : null,
    type === "number"
      ? {
          step: "select_number",
          type: FieldType.multiSelect,
          name: "number",

          multiple: false,
          options: [
            { label: "Less than", value: "<" },
            { label: "Less than or equal", value: "<=" },
            { label: "Equal", value: "==" },
            { label: "Equal or more than", value: ">=" },
            { label: "More than", value: ">" },
          ],
          defaultValue: "==",
          label: "Select operator",
          required: true,
          minRows: 2,
        }
      : null,
    type === "number"
      ? {
          step: "select_number",
          type: FieldType.shortText,
          name: "number",
          multiple: false,
          required: true,
          label: "Value",
          minRows: 2,
        }
      : null,
    type === "string"
      ? {
          step: "set_string",
          type: FieldType.shortText,
          name: "value",
          label: "Value",
          minRows: 2,
        }
      : null,
    {
      step: "label",
      type: FieldType.shortText,
      name: "label",
      label: "Label (optional)",
      minRows: 2,
    },
  ].filter((field) => field !== null) as Field[];
