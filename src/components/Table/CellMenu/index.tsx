import React from "react";
import _find from "lodash/find";
import { PopoverProps } from "@mui/material";

import { getFieldProp } from "@src/components/fields";
import { useProjectContext } from "@src/contexts/ProjectContext";

import { MenuContents } from "./MenuContent";
import { ConstructionOutlined } from "@mui/icons-material";

export type SelectedCell = {
  rowIndex: number;
  colIndex: number;
};

export type CellMenuRef = {
  selectedCell: SelectedCell;
  setSelectedCell: React.Dispatch<React.SetStateAction<SelectedCell | null>>;
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<
    React.SetStateAction<PopoverProps["anchorEl"] | null>
  >;
};

export default function CellMenu() {
  const { cellMenuRef, tableState }: any = useProjectContext();
  const [anchorEl, setAnchorEl] = React.useState<any | null>(null);
  const [selectedCell, setSelectedCell] = React.useState<any | null>();
  const open = Boolean(anchorEl);

  const handleClose = () => {
    //setSelectedCell(null)
    setAnchorEl(null);
  };

  if (cellMenuRef)
    cellMenuRef.current = {
      anchorEl,
      setAnchorEl,
      selectedCell,
      setSelectedCell,
    } as {};

  const selectedColIndex = selectedCell?.colIndex;
  const selectedCol = _find(tableState?.columns, { index: selectedColIndex });
  const getActions =
    getFieldProp("contextMenuActions", selectedCol?.type) ||
    function empty() {};
  const actions = getActions() ?? [];
  console.log("what is actions", actions);
  const hasNoActions = Boolean(actions?.length === 0) ?? true;
  console.log(selectedCol);
  console.log("cellMenuRef", cellMenuRef.current, open, hasNoActions);
  console.log(tableState.columns);
  if (!cellMenuRef.current || !open || hasNoActions) return <></>;

  return (
    <MenuContents
      anchorEl={anchorEl}
      open={open}
      handleClose={handleClose}
      items={actions}
    />
  );
}
