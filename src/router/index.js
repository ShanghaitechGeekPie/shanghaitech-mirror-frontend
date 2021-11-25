import { lazy, Suspense } from 'react'
import { Outlet, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from "framer-motion"
const Home = lazy(() => import("@/views/Home"))
const News = lazy(() => import("@/views/News"))
const Post = lazy(() => import("@/views/Post"))
const Help = lazy(() => import("@/views/Help"))
const About = lazy(() => import("@/views/About"))
const Explorer = lazy(() => import("@/views/Explorer"))

export const Wrapper = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.25
      }}
    >
      <Outlet />
    </motion.div>
  )
}

export default () => {
  const location = useLocation()
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route element={<Wrapper />}>
          <Route path="/" >
            <Route index element={<Suspense fallback={<></>}><Home /></Suspense>} />
            <Route path='help' element={<Suspense fallback={<></>}><Help /></Suspense>} />
            <Route path='news'>
              <Route index element={<Suspense fallback={<></>}><News /></Suspense>} />
              <Route path=':id' element={<Suspense fallback={<>.</>}><Post /></Suspense>} />
            </Route>
            <Route path='help'>
              <Route index element={<Suspense fallback={<></>}><Help /></Suspense>} />
              <Route path=':id' element={<Suspense fallback={<></>}><Help /></Suspense>} />
            </Route>
            <Route path='about' element={<Suspense fallback={<></>}><About /></Suspense>} />
            <Route path='*' element={<Suspense fallback={<></>}><Explorer /></Suspense>} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  )
}