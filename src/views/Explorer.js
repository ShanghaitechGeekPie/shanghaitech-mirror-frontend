import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'
import List from "../components/List"
import Loading from "../components/Loading"
import Failed from "../components/Failed"
import Config from 'Config'
import React from 'react'

export default () => {
  const location = useLocation()
  const { isLoading, isError, data } = useQuery(['summarydata', {path: location.pathname}], () =>
    fetch(Config.serverUrl + '/api/v1' + location.pathname).then(result => result.json()), {
      retry: 0
    }
  )
  if (isLoading) return <Loading />
  if (isError) return <Failed />
  return <List data={data} />
}