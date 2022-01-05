import _find from "lodash/find";
import { TableState } from "@src/hooks/useTable";
import { SelectedCell } from "..";

export default function getTargetCell(
  columns: TableState["columns"],
  rows: TableState["rows"],
  selectedCell: SelectedCell
) {
  const col = _find(columns, { index: selectedCell.colIndex });
  const row = rows[selectedCell.rowIndex];
  return row[col.key];
}
