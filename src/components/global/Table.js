import { withStyles } from '@mui/styles'
import { createTheme } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import { WindowScroller, AutoSizer, Column, Table } from 'react-virtualized'

const styles = () => ({
  display: {
    display: 'flex'
  }
})

const defaultTheme = createTheme()

const VirtualizedTable = withStyles(styles, { defaultTheme })((props) => {
  const headerHeight = 56, rowHeight = 56
  const { classes, columns, ...tableProps } = props

  const headerRenderer = ({ label, columnIndex }) => {
    return (
      <TableCell
        component="div"
        variant="head"
        style={{ height: headerHeight, display: "block" }}
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
        style={{ height: rowHeight, flex: "auto" }}
        align={columns[columnIndex].align}
      >
        {cellData}
      </TableCell>
    )
  }

  return (
    <WindowScroller scrollElement={window}>
      {({ height, isScrolling, onChildScroll, scrollTop }) => (
        <AutoSizer disableHeight>
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
              rowClassName={classes.display}
              {...tableProps}
            >
              {columns.map(({ dataKey, ...columnProps }, index) => {
                return (
                  <Column
                    key={dataKey}
                    width={width}
                    headerRenderer={(headerProps) => headerRenderer({ ...headerProps, columnIndex: index })}
                    className={classes.display}
                    cellRenderer={cellRenderer}
                    dataKey={dataKey}
                    {...columnProps}
                  />
                )
              })}
            </Table>
          )}
        </AutoSizer>)}
    </WindowScroller>
  )
})

export default (props) => {
  return <VirtualizedTable {...props} />
}