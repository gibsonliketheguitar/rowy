import { useEffect, useState } from "react";
import { IMenuModalProps } from ".";

import DataGrid from "react-data-grid";
import _orderBy from "lodash/orderBy";

import Modal from "@src/components/Modal";
import { useProjectContext } from "@src/contexts/ProjectContext";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { StrikethroughSTwoTone, TableRowsSharp } from "@mui/icons-material";
import { mdiConsoleLine } from "@mdi/js";
import { monitorEventLoopDelay } from "perf_hooks";

export interface IArrangeColummns extends IMenuModalProps {
  data: any;
}

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

  const MovableItem = () => {
    const [{ isDragging }, drag] = useDrag({
      item: { name: "An", type: "test" },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
  };

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "Not type",
    drop: () => ({ name: "some name" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  useEffect(() => {
    const isLoadingCol = Boolean(tableState?.loadingColumns);
    const hasCol = Boolean(tableState?.columns);

    if (!isLoadingCol && hasCol) {
      const _columns = _orderBy(Object.values(tableState?.columns!), "index");

      const _rows = _columns.map((column, indx) => {
        return {
          id: indx,
          indexNum: indx,
          columnName: column.name,
          draggable: true,
        };
      });

      setRows(_rows);
    }
  }, [tableState?.loadingColumns, tableState?.columns]);

  return (
    <DndProvider backend={HTML5Backend}>
      <DataGrid rows={rows} columns={column} />
    </DndProvider>
  );
}
