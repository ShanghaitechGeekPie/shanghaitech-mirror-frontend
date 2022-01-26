import { useEffect, Fragment } from 'react'
import nprogress from "nprogress"
import "nprogress/nprogress.css"
import '@/styles/nprogress-zindex.css'

export default () => {
  useEffect(() => {
    nprogress.start()
    return () => nprogress.done()
  })
  return <Fragment />
}