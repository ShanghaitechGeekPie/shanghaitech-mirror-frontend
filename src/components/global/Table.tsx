import { useRef, useLayoutEffect } from 'react'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import TableCell from '@mui/material/TableCell'

/**
 * EstimateRowHeight means the height of table row with
 * only one line of text. Proper configuration derives
 * accurate scroll position in desktop browsers because
 * each element's exact dimensions are unknown when rendered.
 * For mobile browsers, it does not matter due to no scrollbars.
 */
const estimateRowHeight = 53

interface TableColumn {
  [key: string]: string | JSX.Element
}

interface TableColumnMeta {
  label: string,
  dataKey: string,
  align: 'center' | 'inherit' | 'left' | 'right' | 'justify' | undefined
}

interface TableHeaderProps {
  columns: TableColumnMeta[]
}

type TableBodyProps = TableHeaderProps & {
  data: TableColumn[]
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
        style={{ width: '100%' }}
      >
        {column.label}
      </TableCell>
    ))}
  </div>
)

const TableBody = ({ columns, data }: TableBodyProps) => {
  const parentOffsetRef = useRef(0)
  const parentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    parentOffsetRef.current = parentRef.current?.offsetTop ?? 0
  }, [])

  const virtualizer = useWindowVirtualizer({
    count: data.length,
    estimateSize: () => estimateRowHeight,
    scrollMargin: parentOffsetRef.current,
    overscan: 10
  })

  return (
    <div
      ref={parentRef}
      style={{
        height: virtualizer.getTotalSize(),
        width: '100%',
        position: 'relative'
      }}
    >
      {virtualizer.getVirtualItems().map((row) => (
        <div
          key={row.key}
          data-index={row.index}
          ref={virtualizer.measureElement}
          style={{
            position: 'absolute',
            width: '100%',
            display: 'flex',
            transform: `translateY(${
              row.start - virtualizer.options.scrollMargin
            }px)`
          }}
        >
          {columns.map((column) => {
            return (
              <TableCell
                key={column.dataKey}
                component="div"
                variant="body"
                align={column.align}
                style={{ width: '100%' }}
              >
                <div>{data[row.index][column.dataKey]}</div>
              </TableCell>
            )
          })}
        </div>
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

export type { TableColumnMeta }
