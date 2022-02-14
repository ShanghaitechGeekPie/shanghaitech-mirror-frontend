import { withStyles } from '@mui/styles'
import { createTheme } from '@mui/material/styles'
import { WindowScroller, AutoSizer, Column, Table } from 'react-virtualized'
import { Scrollbars } from 'react-custom-scrollbars'
import TableCell from '@mui/material/TableCell'

const styles = (theme) => ({
  hover: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    }
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
        style={{ height: rowHeight, flex: "auto", paddingBottom: "12px", whiteSpace: "nowrap" }}
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
          renderTrackVertical={() => <div />}
          renderThumbVertical={() => <div />}
          renderView={props => (
            <div {...props} style={{ ...props.style, marginRight: 0, overflowY: "hidden" }} />
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
              rowClassName={({ index }) => index != -1 && classes.hover}
              rowStyle={{ display: 'flex' }}
              {...tableProps}
            >
              {columns.map(({ dataKey, ...columnProps }, index) => {
                return (
                  <Column
                    key={dataKey}
                    width={width}
                    headerRenderer={(headerProps) => headerRenderer({ ...headerProps, columnIndex: index })}
                    cellRenderer={cellRenderer}
                    dataKey={dataKey}
                    style={{ display: 'flex' }}
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