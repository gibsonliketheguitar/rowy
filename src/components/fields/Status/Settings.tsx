import { useState } from "react";
import { ISettingsProps } from "../types";

import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import ConditionModal from "./ConditionModal";
import ConditionList from "./ConditionList";
import { FormDialog } from "@rowy/form-builder";
import MultiSelect from "@rowy/multiselect";
import { conditionSettings } from "./utils/form";

export interface IConditionModal {
  isOpen: boolean;
  index: number | null;
  condition: {
    type: string;
    value: any;
    label: string;
    operator: string | undefined;
  };
}

export const EMPTY_STATE: IConditionModal = {
  index: null,
  isOpen: false,
  condition: {
    type: "null",
    value: null,
    label: "",
    operator: "==",
  },
};

export default function Settings({ onChange, config }: ISettingsProps) {
  const [modal, setModal] = useState(EMPTY_STATE);
  return (
    <>
      <ConditionList config={config} setModal={setModal} />
      <Button
        onClick={() => setModal({ ...EMPTY_STATE, isOpen: true })}
        startIcon={<AddIcon />}
      >
        Add condition
      </Button>
      <ConditionModal
        modal={modal}
        setModal={setModal}
        conditions={config.conditions}
        setConditions={onChange("conditions")}
      />
      w
      <ConditionModal2
        open={modal.isOpen}
        isEditing={typeof modal.index === "number"}
      />
    </>
  );
}

function ConditionModal2({ open, isEditing }: any) {
  const conditionFields = conditionSettings("string");
  if (!open) return null;
  return (
    <FormDialog
      fields={conditionFields}
      onClose={() => console.log("close")}
      title={`${isEditing ? "Edit" : "Add"} condition`}
      values={(v) => console.log("check", v)}
      onSubmit={(v) => console.log("check", v)}
      SubmitButtonProps={{
        children: isEditing ? "Edit" : "Add",
      }}
    />
  );
}
