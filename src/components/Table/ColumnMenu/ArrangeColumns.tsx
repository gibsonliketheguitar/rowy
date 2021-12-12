import { IMenuModalProps } from ".";
import { useEffect, useRef, useState } from "react";

import _sortBy from "lodash/sortBy";
import _orderBy from "lodash/orderBy";
import DataGrid, { Row, RowRendererProps } from "react-data-grid";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Modal from "@src/components/Modal";
import { useProjectContext } from "@src/contexts/ProjectContext";
import useCombinedRefs from "@src/hooks/useCombinedRefs";

export interface IArrangeColummns extends IMenuModalProps {
  data: any;
}

export default function ArrangeColumn({
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
  const columns = [
    {
      key: "order",
      name: "order",
      type: "Arrange_Column",
      index: 0,
      width: 80,
      headerCellClass: "arrange-column-header",
      cellClass: "arrange-column-cell",
      editable: false,
    },
    {
      key: "name",
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
    console.log("firing");
    const isLoadingCol = Boolean(tableState?.loadingColumns);
    const hasCol = Boolean(tableState?.columns);

    if (!isLoadingCol && hasCol) {
      const _columns = _orderBy(Object.values(tableState?.columns!), "index");
      const _rows = _columns.map((column, index) => {
        return {
          order: index,
          name: column.name,
        };
      });

      setRows(_rows);
    }
  }, [tableState?.loadingColumns, tableState?.columns]);

  function arrangeRow(sourceIndex, targetIndex) {
    console.log(sourceIndex, targetIndex);

    const newRows = Array.from(
      rows.map((row, indx) => {
        if (indx === sourceIndex)
          return { order: sourceIndex, name: rows[targetIndex].name };
        if (indx === targetIndex)
          return { order: targetIndex, name: rows[sourceIndex].name };
        return row;
      })
    );
    setRows(newRows);
  }

  useEffect(() => {
    console.log(rows);
  }, [rows]);

  function MyRowRenderer(props: RowRendererProps<typeof Row>) {
    const [{ isDragging }, drag] = useDrag({
      item: { type: "ROW_DRAG", cellIndex: props.rowIdx },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });

    const [{ isOver }, drop] = useDrop({
      accept: "ROW_DRAG",
      drop: ({ cellIndex }: any) => arrangeRow(cellIndex, props.rowIdx),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    });

    const ref = useCombinedRefs(drag, drop);

    return <Row ref={ref} {...props} />;
  }

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      rowRenderer={MyRowRenderer}
      onRowsChange={setRows}
    />
  );
}
