import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
const Home = lazy(() => import("@/views/Home"))
const News = lazy(() => import("@/views/News"))
const Post = lazy(() => import("@/views/Post"))
const Help = lazy(() => import("@/views/Help"))
const About = lazy(() => import("@/views/About"))
const Explorer = lazy(() => import("@/views/Explorer"))

export default () => {
  return (
    <Routes>
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
    </Routes>
  )
}