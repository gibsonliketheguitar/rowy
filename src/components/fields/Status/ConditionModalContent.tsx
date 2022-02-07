import _find from "lodash/find";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MultiSelect from "@rowy/multiselect";
import { Boolean, Number, String } from "./ConditionModalContextType";

export default function ConditionModalContent({
  condition,
  handleUpdate,
}: any) {
  const { label, operator, type, value } = condition;

  return (
    <>
      <Typography variant="overline">DATA TYPE (input)</Typography>
      <MultiSelect
        options={[
          { label: "Boolean", value: "boolean" },
          { label: "Number", value: "number" },
          { label: "String", value: "string" },
          { label: "Undefined", value: "undefined" },
          { label: "Null", value: "null" },
        ]}
        onChange={(v) => handleUpdate("type")(v)}
        value={type}
        multiple={false}
        label="Select data type"
      />
      {/** SelectModal Field Base on types. Remove Conditional */}
      {(type) => {
        switch (type) {
          case "null":
            return <></>;
          case "number":
            return (
              <Number
                value={value}
                handleUpdate={handleUpdate}
                operator={operator}
              />
            );
          case "boolean":
            return <Boolean value={value} handleUpdate={handleUpdate} />;
          case "string":
            return <String value={value} handleUpdate={handleUpdate} />;
          default:
            return <></>;
        }
      }}
      <TextField
        value={label}
        label="Label"
        fullWidth
        onChange={(e) => handleUpdate("label")(e.target.value)}
      />
    </>
  );
}
