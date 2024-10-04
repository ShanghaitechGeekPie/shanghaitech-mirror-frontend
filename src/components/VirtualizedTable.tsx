import { useRef } from 'react'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'

/**
 * EstimateRowHeight means the height of table row with
 * only one line of text. Proper configuration derives
 * accurate scroll position in desktop browsers because
 * each element's exact dimensions are unknown when rendered.
 * For mobile browsers, it does not matter due to no scrollbars.
 */
const estimateRowHeight = 53

interface TableColumnMeta {
  label: string,
  dataKey: string,
  align: 'center' | 'inherit' | 'left' | 'right' | 'justify' | undefined
}

interface TableHeaderProps {
  columns: TableColumnMeta[]
}

type TableBodyProps = TableHeaderProps & {
  data: Record<string, string | JSX.Element>[]
}

type VirtualizedTableProps = TableBodyProps

const TableHeader = ({ columns }: TableHeaderProps) => (
  <div style={{ width: '100%', display: 'flex' }}>
    {columns.map((column) => (
      <TableCell
        key={column.dataKey}
        component="div"
        variant="head"
        align={column.align}
        style={{ width: '100%', borderBottom: '0' }}
      >
        {column.label}
      </TableCell>
    ))}
  </div>
)

const TableBody = ({ columns, data }: TableBodyProps) => {
  const parentRef = useRef<HTMLDivElement | null>(null)
  const virtualizer = useWindowVirtualizer({
    count: data.length,
    estimateSize: () => estimateRowHeight,
    scrollMargin: parentRef.current?.offsetTop ?? 0,
    overscan: 5
  })

  return (
    <div
      ref={parentRef}
      style={{
        height: `${virtualizer.getTotalSize()}px`,
        width: '100%',
        position: 'relative'
      }}
    >
      {virtualizer.getVirtualItems().map((row) => (
        <Box
          key={row.key}
          data-index={row.index}
          ref={virtualizer.measureElement}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(128, 128, 128, .08)'
            }
          }}
          style={{
            position: 'absolute',
            width: '100%',
            display: 'flex',
            transform: `translateY(${row.start - virtualizer.options.scrollMargin}px)`
          }}
        >
          {columns.map((column) => {
            return (
              <TableCell
                key={column.dataKey}
                component="div"
                variant="body"
                align={column.align}
                style={{
                  width: '100%',
                  borderBottom: '0',
                  borderTop: '1px solid rgba(81, 81, 81, 1)'
                }}
              >
                {data[row.index][column.dataKey]}
              </TableCell>
            )
          })}
        </Box>
      ))}
    </div>
  )
}

export default (props: VirtualizedTableProps) => {
  const { columns, data } = props

  return (
    <>
      <TableHeader columns={columns} />
      <TableBody columns={columns} data={data} />
    </>
  )
}
