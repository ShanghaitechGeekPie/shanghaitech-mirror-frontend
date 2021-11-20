import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
const Home = lazy(() => import("@/views/Home"))
const Help = lazy(() => import("@/views/Help"))
const News = lazy(() => import("@/views/News"))
const Post = lazy(() => import("@/views/Post"))
const About = lazy(() => import("@/views/About"))
const Explorer = lazy(() => import("@/views/Explorer"))

export default () => {
  const location = useLocation()
  return (
    <Routes>
      <Route path='/' element={<Suspense fallback={<>...</>}><Home /></Suspense>} />
      <Route path='/help' element={<Suspense fallback={<>...</>}><Help /></Suspense>} />
      <Route path='/news' element={<Suspense fallback={<>...</>}><News /></Suspense>} />
      <Route path='/news/:id' element={<Suspense fallback={<>...</>}><Post /></Suspense>} />
      <Route path='/about' element={<Suspense fallback={<>...</>}><About /></Suspense>} />
      <Route path='*' element={<Suspense fallback={<>...</>}><Explorer key={location.pathname} /></Suspense>} />
    </Routes>
  )
}