import { IMenuModalProps } from ".";
import { useEffect, useRef, useState } from "react";

import _sortBy from "lodash/sortBy";
import _orderBy from "lodash/orderBy";
import { Grid } from "@mui/material";
import DataGrid from "react-data-grid";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Modal from "@src/components/Modal";
import { useProjectContext } from "@src/contexts/ProjectContext";
import useCombinedRefs from "@src/hooks/useCombinedRefs";
import { MoreVertTwoTone, RowingSharp, Umbrella } from "@mui/icons-material";
import { tableSettings } from "@src/components/TableSettings/form";
import { mdiArrangeBringForward } from "@mdi/js";
import { arrayMover } from "@src/utils/fns";

export interface IArrangeColummns extends IMenuModalProps {
  data: any;
}

export const RowTypes = {
  ROW: "ROW_DRAG",
};

export default function ArrangeColumn({
  fieldName,
  open,
  handleClose,
  handleSave,
}: IMenuModalProps) {
  const { tableState, tableActions } = useProjectContext();
  if (!open) return null;
  console.log("project context", tableState, tableActions);

  return (
    <Modal
      onClose={handleClose}
      title="Arrange Columns"
      maxWidth="xs"
      children={<ModalChildren />}
      actions={{
        primary: {
          onClick: () => {
            //handleSave(fieldName, { name: newName });
            handleClose();
          },

          children: "Update",
        },
        secondary: {
          onClick: handleClose,
          children: "Cancel",
        },
      }}
    />
  );
}

function ModalChildren() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container />
    </DndProvider>
  );
}

function Container() {
  const column = [
    {
      key: "indexNum",
      name: "index",
      type: "Arrange_Column",
      index: 0,
      width: 80,
      headerCellClass: "arrange-column-header",
      cellClass: "arrange-column-cell",
      editable: false,
    },
    {
      key: "columnName",
      name: "Column Name",
      type: "Arrange_Column",
      index: 0,
      width: 204,
      headerCellClass: "arrange-column-header",
      cellClass: "arrange-column-cell",
      editable: false,
    },
  ];
  const [rows, setRows] = useState<any[]>([]);
  const { tableState } = useProjectContext();

  useEffect(() => {
    const isLoadingCol = Boolean(tableState?.loadingColumns);
    const hasCol = Boolean(tableState?.columns);

    if (!isLoadingCol && hasCol) {
      const _columns = _orderBy(Object.values(tableState?.columns!), "index");

      const _rows = _columns.map((column, index) => {
        return {
          //id: index,
          //index: index,
          columnName: column.name,
          draggable: true,
        };
      });

      setRows(_rows);
    }
  }, [tableState?.loadingColumns, tableState?.columns]);

  function arrangeRow(sourceIndex, targetIndex) {
    const newRows = Array.from(rows, (row, index) => {
      if (index === sourceIndex) return rows[targetIndex];
      if (index === targetIndex) return rows[sourceIndex];
      return row;
    });

    setRows(newRows);
  }

  function renderRow(i: number) {
    return (
      <div key={i}>
        <Row>
          <Cell index={i} data={rows[i]} arrangeRow={arrangeRow} />
        </Row>
      </div>
    );
  }

  return <div>{rows.map((row, index) => renderRow(index))}</div>;
}

function Row({ children }: any) {
  return <div>{children}</div>;
}

function Cell({ index, data, arrangeRow }: any) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: "ROW_DRAG", cellIndex: index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: "ROW_DRAG",
    drop: ({ cellIndex }: any) => arrangeRow(cellIndex, index),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  const ref = useCombinedRefs(drag, drop);

  return (
    <div ref={ref}>
      {index}
      {data.columnName}
    </div>
  );
}
