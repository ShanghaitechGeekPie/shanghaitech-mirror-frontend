import Container from '@mui/material/Container'
import { useLocation } from 'react-router-dom'
import axios from "axios"
import { useEffect, useState } from 'react'
import List from "../components/List"
import Loading from "../components/Loading"
import Failed from "../components/Failed"

export default function Explorer(props) {
  const [failed, setFailed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState([])
  const location = useLocation()
  useEffect(() => {
    (async () => {
      setLoading(true)
      await axios.get(Config.serverUrl + '/api/v1' + location.pathname)
      .then(function (content) {
        if (!(content.data instanceof Array)) setFailed(true)
        else {
          setContent(content.data)
          setLoading(false)
        }
      })
      .catch(() => (setFailed(true)))
    })()
  }, [props.location])
  return (
    <Container maxWidth="lg" sx={{ pt: 8, pb: 6 }}>
      { failed ? (<Failed />) : ( loading ? <Loading /> : <List data={content} /> )}
    </Container>
  )
}