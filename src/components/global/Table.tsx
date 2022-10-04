import { WindowScroller, AutoSizer, Column, Table } from 'react-virtualized'
import { Scrollbars } from 'react-custom-scrollbars'
import TableCell from '@mui/material/TableCell'
import styles from '@/styles/modules/index.module.css'
import clsx from 'clsx'
import * as React from 'react'

const headerHeight = 56, rowHeight = 56

const VirtualizedTable = ({ columns, ...tableProps }) => {

  const headerRenderer = ({ label, columnIndex }) => {
    return (
      <TableCell
        component="div"
        variant="head"
        style={{ height: headerHeight, display: "block", fontSize: "0.95rem" }}
        align={columns[columnIndex].align}
      >
        {label}
      </TableCell>
    )
  }

  const cellRenderer = ({ cellData, columnIndex }) => {
    return (
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
  }

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
              rowClassName={({ index }) => {
                const isOnHover = index !== -1, isBorderBottom = index < tableProps.rowCount - 1
                return clsx(isOnHover && styles.onHover, isBorderBottom && styles.borderBottom)
              }}
              {...tableProps}
            >
              {columns.map(({ dataKey, ...columnProps }, index) => (
                <Column
                  width={width}
                  key={dataKey}
                  dataKey={dataKey}
                  headerRenderer={(headerProps) => headerRenderer({ ...headerProps, columnIndex: index })}
                  cellRenderer={cellRenderer}
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

export default (props) => <VirtualizedTable {...props} />