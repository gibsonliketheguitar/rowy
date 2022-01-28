import _find from "lodash/find";
import CopyCells from "@src/assets/icons/CopyCells";
import Cut from "@src/assets/icons/Cut";
import Paste from "@src/assets/icons/Paste";
import { useProjectContext } from "@src/contexts/ProjectContext";

export default function BasicContextMenuActions() {
  const { cellMenuRef, tableState, deleteCell, updateCell } =
    useProjectContext();

  const selectedRowIndex = cellMenuRef?.current?.selectedCell
    .rowIndex as number;
  const selectedColIndex = cellMenuRef?.current?.selectedCell?.colIndex;
  const selectedCol = _find(tableState?.columns, { index: selectedColIndex });
  const selectedRow = tableState?.rows?.[selectedRowIndex];

  const onClose = () => {
    cellMenuRef?.current?.setSelectedCell(null);
    cellMenuRef?.current?.setAnchorEl(null);
  };

  const handleCopy = () => {
    const cell = selectedRow?.[selectedCol.key];
    const onFail = () => console.log("Fail to copy");
    const onSuccess = () => console.log("Save to clipboard successful");
    const copy = navigator.clipboard.writeText(JSON.stringify(cell));
    copy.then(onSuccess, onFail);
    //onClose()
  };

  const handleCut = () => {
    handleCopy();
    if (deleteCell) {
      deleteCell(selectedRow?.ref, selectedCol?.key);
    }
  };

  const handlePaste = () => {
    const paste = navigator.clipboard.readText();
    paste.then(async (clipText) => {
      try {
        const paste = await JSON.parse(clipText);
        updateCell?.(selectedRow?.ref, selectedCol.key, paste);
      } catch (error) {
        //TODO check the coding style guide about error message
        //Add breadcrumb handler her
        console.log(error);
      }
    });

    const cellMenuAction = [
      { label: "Cut", icon: <Cut />, onClick: handleCut },
      { label: "Copy", icon: <CopyCells />, onClick: handleCopy },
      { label: "Paste", icon: <Paste />, onClick: handlePaste },
    ];
    console.log("redturing");
    return cellMenuAction;
  };
}
