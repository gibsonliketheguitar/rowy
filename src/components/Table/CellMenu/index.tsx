import React, { useState } from "react";
import { atom, useAtom } from "jotai";
import _find from "lodash/find";
import { PopoverProps } from "@mui/material";

import CopyCells from "@src/assets/icons/CopyCells";
import Paste from "@src/assets/icons/Paste";
import { useProjectContext } from "@src/contexts/ProjectContext";

import { MenuContents } from "./MenuContent";
import { formatClipData, formatData } from "./utils/dataHelper";

export const cellMenuDataAtom = atom("");

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

  if (cellMenuRef)
    cellMenuRef.current = {
      anchorEl,
      setAnchorEl,
      selectedCell,
      setSelectedCell,
    } as {};

  const handleClose = () => setAnchorEl(null);
  const handleCopy = () => {
    const col = _find(tableState.columns, { index: selectedCell.colIndex });
    const row = tableState.rows[selectedCell.rowIndex];
    const cell = row[col.key];
    console.log(cell);

    const clipObj = { sourceColType: col.type, value: formatData(cell) };
    const onFail = () => console.log("Fail to copy");
    const onSuccess = () => console.log("Save to clipboard successful");
    const copy = navigator.clipboard.writeText(JSON.stringify(clipObj));
    copy.then(onSuccess, onFail);

    handleClose();
  };

  const handlePaste = () => {
    const targetRow = tableState.rows[selectedCell.rowIndex];
    const targetCol = _find(tableState.columns, {
      index: selectedCell.colIndex,
    });
    const paste = navigator.clipboard.readText();

    paste.then(async (clipText) => {
      try {
        const paste = await JSON.parse(clipText);
        if (paste.sourceColType !== targetCol.type)
          throw "paste type does not match target cell type";

        const newData = formatClipData(clipText);
        if (deleteCell && typeof newData === "undefined")
          deleteCell(targetRow.ref, targetCol.key);
        else if (updateCell) updateCell(targetRow.ref, targetCol.key, newData);
      } catch (error) {
        //TODO check the coding style guide about error message
        //Add breadcrumb handler her
        console.log(error);
      }
    });

    handleClose();
  };

  const cellMenuAction = [
    { label: "Copy", icon: <CopyCells />, onClick: handleCopy },
    { label: "Paste", icon: <Paste />, onClick: handlePaste },
  ];

  if (!cellMenuRef.current || !open) return <></>;
  return (
    <MenuContents
      anchorEl={anchorEl}
      open={open}
      handleClose={handleClose}
      items={cellMenuAction}
    />
  );
}
