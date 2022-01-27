import React from "react";
import _find from "lodash/find";
import { PopoverProps } from "@mui/material";

import { getFieldProp } from "@src/components/fields";
import { useProjectContext } from "@src/contexts/ProjectContext";

import { MenuContents } from "./MenuContent";

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
  const { cellMenuRef, deleteCell, tableState, updateCell }: any =
    useProjectContext();
  const [anchorEl, setAnchorEl] = React.useState<any | null>(null);
  const [selectedCell, setSelectedCell] = React.useState<any | null>();
  const open = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);

  if (cellMenuRef)
    cellMenuRef.current = {
      anchorEl,
      setAnchorEl,
      selectedCell,
      setSelectedCell,
    } as {};
  if (!cellMenuRef.current || !open) return <></>;

  const selectedColIndex = selectedCell?.colIndex;
  const selectedCol = _find(tableState?.columns, { index: selectedColIndex });
  const actions = getFieldProp("contextMenuActions", selectedCol.type) || [];
  const hasNoAction = Boolean(actions);

  if (hasNoAction) return <></>;
  return (
    <MenuContents
      anchorEl={anchorEl}
      open={open}
      handleClose={handleClose}
      items={actions}
    />
  );
}
