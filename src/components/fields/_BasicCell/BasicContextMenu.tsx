import _find from "lodash/find";
import CopyCells from "@src/assets/icons/CopyCells";
import Cut from "@src/assets/icons/Cut";
import Paste from "@src/assets/icons/Paste";
import { useProjectContext } from "@src/contexts/ProjectContext";

export default function BasicContextMenu() {
  const { cellMenuRef, tableState } = useProjectContext();
  const { columns, rows }: any = tableState;
  const selectedRowIndex = cellMenuRef?.current?.selectedCell
    .rowIndex as number;
  const selectedColIndex = cellMenuRef?.current?.selectedCell.colIndex;
  const selectedCol = _find(columns, { index: selectedColIndex });
  const selectedRow = rows?.[selectedRowIndex];

  const handleCopy = () => {
    const cell = selectedRow[selectedCol.key];
    console.log("what is cell", cell);
  };

  const handleCut = () => {};

  const handlePaste = () => {};

  const cellMenuAction = [
    { label: "Cut", icon: <Cut />, onClick: handleCut },
    { label: "Copy", icon: <CopyCells />, onClick: handleCopy },
    { label: "Paste", icon: <Paste />, onClick: handlePaste },
  ];
  return cellMenuAction;
}
