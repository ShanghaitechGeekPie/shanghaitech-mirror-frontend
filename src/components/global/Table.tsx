import {
  WindowScroller as _WindowScroller,
  AutoSizer as _AutoSizer,
  Column as _Column,
  Table as _Table,
  WindowScrollerProps,
  AutoSizerProps,
  ColumnProps,
  TableProps,
  TableHeaderProps,
  TableCellProps
} from 'react-virtualized'
import { FC } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import TableCell from '@mui/material/TableCell'
import styles from '@/styles/modules/index.module.css'
import clsx from 'clsx'
import * as React from 'react'

const WindowScroller = _WindowScroller as unknown as FC<WindowScrollerProps>
const AutoSizer = _AutoSizer as unknown as FC<AutoSizerProps>
const Column = _Column as unknown as FC<ColumnProps>
const Table = _Table as unknown as FC<TableProps>

const headerHeight = 56, rowHeight = 56

interface VirtualizedTableProps {
  columns: any
  rowCount: number
  rowGetter: any
}

const VirtualizedTable = ({ columns, ...tableProps }: VirtualizedTableProps) => {

  interface ExtendTableHeaderProps extends TableHeaderProps { columnIndex: number }

  const headerRenderer = ({ label, columnIndex }: ExtendTableHeaderProps) => {
    return (
      <TableCell
        component="div"
        variant="head"
        style={{ height: headerHeight, display: "block", fontSize: "0.95rem" }}
        align={columns[columnIndex].align}
      >
        {label as JSX.Element}
      </TableCell>
    )
  }

  const cellRenderer = ({ cellData, columnIndex }: TableCellProps) => (
    <TableCell
      component="div"
      variant="body"
      style={{ height: rowHeight, flex: "auto", paddingBottom: "12px", whiteSpace: "nowrap", borderBottom: 0 }}
      align={columns[columnIndex].align}
    >
      {/*
          react-custom-scrollbars does not adapt to mobile scrollbars,
          so you must add overflowY: "hidden" to ensure that
          the mobile side will not scroll in the Y-axis,
          but I do not know whether it is just a bug of the package,
          which will lead to the scrollbar of the desktop side 
          can not display the content completely,
          so here you must use both marginRight: 0 and overflowY: "hidden"
          in order to ensure that the content can be displayed completely.
        */}
      <Scrollbars
        autoHide
        autoHideTimeout={200}
        className={styles.noScrollbar}
        renderTrackVertical={() => <div />}
        renderThumbVertical={() => <div />}
        renderView={({ style, ...props }) => (
          <div {...props} style={{ ...style, marginRight: 0, overflowY: "hidden" }} />
        )}
      >
        {cellData}
      </Scrollbars>
    </TableCell>
  )

  return (
    <WindowScroller scrollElement={window}>
      {({ height, isScrolling, onChildScroll, scrollTop }) => (
        <AutoSizer disableHeight>
          {/*
            There are accessibility errors due to duplicate role="rowgroup"
            in both ReactVirtualized__Grid and ReactVirtualized__Grid__innerScrollContainer
            which breaks the parent-child relationship between ReactVirtualized__Table__row
            and it true parent(ReactVirtualized__Grid). It is confusing because none issue
            of this problem mentioned in the original repository has been solved.
          */}
          {({ width }) => (
            <Table
              autoHeight
              height={height}
              width={width}
              isScrolling={isScrolling}
              onScroll={onChildScroll}
              scrollTop={scrollTop}
              rowHeight={rowHeight}
              headerHeight={headerHeight}
              rowStyle={{ display: 'flex' }}
              rowClassName={({ index = 0 }) => {
                const isOnHover = index !== -1, isBorderBottom = index < tableProps.rowCount - 1
                return clsx(isOnHover && styles.onHover, isBorderBottom && styles.borderBottom)
              }}
              {...tableProps}
            >
              {columns.map(({ dataKey, ...columnProps }: { dataKey: string }, index: number) => (
                <Column
                  width={width}
                  key={dataKey}
                  dataKey={dataKey}
                  headerRenderer={(headerProps: any) => headerRenderer({ ...headerProps, columnIndex: index })}
                  cellRenderer={(cellProps: any) => cellRenderer({ ...cellProps })}
                  style={{ display: 'flex' }}
                  {...columnProps}
                />
              ))}
            </Table>
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  )
}

export default (props: any) => <VirtualizedTable {...props} />
