import { Grid, TextField } from "@mui/material";
import MultiSelect from "@rowy/multiselect";

export function String({ value, handleUpdate }: any) {
  return (
    <TextField
      fullWidth
      label="Value"
      value={value}
      onChange={(e) => handleUpdate("value")(e.target.value)}
    />
  );
}

export function Number({ value, operator, handleUpdate }: any) {
  return (
    <Grid container direction="row" justifyContent="space-between">
      <div style={{ width: "45%" }}>
        <MultiSelect
          options={[
            { label: "Less than", value: "<" },
            { label: "Less than or equal", value: "<=" },
            { label: "Equal", value: "==" },
            { label: "Equal or more than", value: ">=" },
            { label: "More than", value: ">" },
          ]}
          onChange={(v) => handleUpdate("operator")(v)}
          value={operator}
          multiple={false}
          label="Select operator"
        />
      </div>
      <TextField
        type="number"
        label="Value"
        value={value}
        onChange={(e) => handleUpdate("value")(Number(e.target.value))}
      />
    </Grid>
  );
}

export function Boolean({ value, handleUpdate }: any) {
  return (
    <MultiSelect
      options={[
        { label: "True", value: "true" },
        { label: "False", value: "false" },
      ]}
      onChange={(v) => handleUpdate("value")(v === "true")}
      value={value ? "true" : "false"}
      multiple={false}
      label="Select condition value"
    />
  );
}
