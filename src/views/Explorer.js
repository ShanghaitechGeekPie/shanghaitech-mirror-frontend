import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'
import List from "@/components/views/List"
import Loading from "@/components/global/Loading"
import Failed from "@/components/global/Failed"
import Config from 'Config'

export default () => {
  const location = useLocation()
  const { isLoading, isError, data } = useQuery(['summarydata', {path: location.pathname}], () =>
    fetch(Config.serverUrl + '/api/v1' + location.pathname).then(result => result.json())
  )
  if (isLoading) return <Loading />
  if (isError) return <Failed />
  return <List data={data} />
}