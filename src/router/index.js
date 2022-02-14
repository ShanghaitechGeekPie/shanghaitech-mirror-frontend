import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Progress from '@/components/global/Progress'
const Home = lazy(() => import("@/views/Home"))
const Post = lazy(() => import("@/views/Post"))
const Help = lazy(() => import("@/views/Help"))
const About = lazy(() => import("@/views/About"))
const Explorer = lazy(() => import("@/views/Explorer"))

export default () => {
  return (
    <Suspense fallback={<Progress />}>
      <Routes>
        <Route path="/" >
          <Route index element={<Home />} />
          <Route path='news'>
            <Route path=':id' element={<Post />} />
          </Route>
          <Route path='help'>
            <Route index element={<Help />} />
            <Route path=':id' element={<Help />} />
          </Route>
          <Route path='about' element={<About />} />
          <Route path='*' element={<Explorer />} />
        </Route>
      </Routes>
    </Suspense>
  )
}