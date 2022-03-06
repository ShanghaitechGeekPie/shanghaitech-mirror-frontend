import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
const Home = lazy(() => import("@/views/Home"))
const News = lazy(() => import("@/views/News"))
const Help = lazy(() => import("@/views/Help"))
const About = lazy(() => import("@/views/About"))
const Explorer = lazy(() => import("@/views/Explorer"))

export default () => {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route path="/" >
          <Route index element={<Home />} />
          <Route path='news'>
            <Route path=':id' element={<News />} />
          </Route>
          <Route path='help'>
            <Route index element={<Help />} />
            <Route path=':name' element={<Help />} />
          </Route>
          <Route path='about' element={<About />} />
          <Route path='*' element={<Explorer />} />
        </Route>
      </Routes>
    </Suspense>
  )
}