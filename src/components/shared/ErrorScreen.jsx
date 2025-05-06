import { useEffect } from "react"
import { useSnackbar } from 'notistack'

export function ErrorScreen ({ message }) {
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    enqueueSnackbar(`Error: ${message}`, { variant: 'error'})
  }, [message, enqueueSnackbar])

  return <></>
}

