import { useState, useEffect } from 'react'
import { JaaSMeeting } from '@jitsi/react-sdk'
import { useParams } from 'react-router-dom'
import { getRoomDataFromFirestore } from '../../services/functions'
import NotFound from '../404'
import { LoadingCircle } from '../../routes/PrivateRoute'

const RoomPage = () => {
  const [onCall, setOnCall] = useState(false)
  const [isLoading, setIsLoading] = useState(true) // Estado de carregamento

  const { roomId } = useParams()

  const data = roomId as string

  useEffect(() => {
    const checkRoomValidity = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      if (typeof roomId === 'string') {
        try {
          const roomDetails = await getRoomDataFromFirestore(roomId)

          // Restante da lógica de validação...

          const eventDate = roomDetails.eventDate // Formato: 'YYYY-MM-DD'
          const eventTime = roomDetails.time // Formato: 'HH:mm'

          // Converter a data e hora do evento para um objeto Date
          const [eventYear, eventMonth, eventDay] = eventDate.split('-')
          const [eventHour, eventMinute] = eventTime.split(':')
          const eventDateTime = new Date(
            eventYear,
            eventMonth - 1, // Os meses em JavaScript são baseados em zero (janeiro = 0)
            eventDay,
            eventHour,
            eventMinute
          ).getTime()

          // Obter a data e hora atual
          const currentDate = new Date()
          const currentDateTime = currentDate.getTime()

          // Validar se a data do evento é igual à data atual
          const isSameDay =
            currentDate.toDateString() ===
            new Date(eventDateTime).toDateString()

          // Validar se a hora atual está dentro do intervalo permitido
          const allowedStartTime = eventDateTime - 5 * 60 * 1000 // 5 minutos antes do horário do evento
          const allowedEndTime = eventDateTime + 60 * 60 * 1000 // 1 hora após o horário do evento

          if (
            isSameDay &&
            currentDateTime >= allowedStartTime &&
            currentDateTime <= allowedEndTime
          ) {
            // O usuário tem permissão para entrar na sala
            setOnCall(true)

            // Restante da lógica para configurar displayName e password...
          } else {
            // O usuário não tem permissão para entrar na sala
            setOnCall(false)

            // Restante da lógica para lidar com a negação de acesso...
          }
        } catch (error) {
          setOnCall(false)
          // Tratar erros ao obter os detalhes da sala
          console.log(error)
        } finally {
          setIsLoading(false) // Finaliza o estado de carregamento
        }
      } else {
        throw new Error('roomId não é uma string')
      }
    }

    // Verifica se roomId é válido
    if (typeof roomId === 'string') {
      checkRoomValidity()
    } else {
      setOnCall(false)
      setIsLoading(false) // Finaliza o estado de carregamento
    }
  }, [roomId])

  const handleApiReady = (api: any) => {
    // Adiciona manipuladores de eventos
    api.addEventListener('participantJoined', handleParticipantJoined)
    api.addEventListener('participantLeft', handleParticipantLeft)

    // Define as opções de configuração
    api.setAudioInputDevice('default')
    api.setVideoInputDevice('default')

    // Inicia a chamada
    api.executeCommand('startCall')
  }

  
  const handleParticipantJoined = (event: any) => {
    // Manipula o evento de participante entrando na chamada
    const participantId = event.id
    console.log(`Participant ${participantId} joined the call.`)
  }

  const handleParticipantLeft = (event: any) => {
    // Manipula o evento de participante saindo da chamada
    const participantId = event.id
    console.log(`Participant ${participantId} left the call.`)
  }

  if (isLoading) {
    // Exibe o componente de carregamento enquanto a validação é realizada
    return <LoadingCircle />
  }

  return (
    <>
      {onCall ? (
        <JaaSMeeting
          appId={`${process.env.REACT_APP_APP_ID}`}
          getIFrameRef={(node) => {
            if (window.innerWidth) {
              node.style.width = '100vw' // Valor médio para desktop
              node.style.height = '100vh' // Valor médio para desktop
            } else if (window.innerWidth >= 768) {
              node.style.width = '100vw' // Valor médio para tablet
              node.style.height = '100vh' // Valor médio para tablet
              node.style.overflowX = 'hidden' // Valor médio para desktop
              node.style.overflowY = 'auto' // Valor médio para desktop
            } else {
              node.style.width = '100vw' // Valor médio para celular
              node.style.height = '100vh' // Valor médio para celular
              node.style.overflowX = 'hidden' // Valor médio para desktop
              node.style.overflowY = 'scroll' // Valor médio para desktop
            }
            // Adicione outras propriedades de estilização conforme necessário
          }}
          roomName={data}
          //jwt={`${process.env.REACT_APP_JWT}`}
          configOverwrite={{
            disableThirdPartyRequests: true,
            disableLocalVideoFlip: true,
            startWithVideoMuted: true, // Desabilita o vídeo dos participantes no início da chamada
            enableWelcomePage: false, // Remove a página de boas-vindas
            enableClosePage: false, // Remove a página de encerramento
            enableCalendarIntegration: false, // Remove a integração com calendário
            enableNoisyMicDetection: false, // Desabilita a detecção de microfone barulhento
            enableTalkWhileMuted: false, // Desabilita falar enquanto estiver com o microfone mudo
          }}
          interfaceConfigOverwrite={{
            VIDEO_LAYOUT_FIT: 'nocrop',
            MOBILE_APP_PROMO: false,
            TILE_VIEW_MAX_COLUMNS: 4,
          }}
          onApiReady={handleApiReady}
        />
      ) : (
        <NotFound />
      )}
    </>
  )
}

export default RoomPage
