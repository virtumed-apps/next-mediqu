import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Flex,
  Input,
  Text,
  Image,
  Button,
  useColorMode,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react'

import { EnterRoom } from '../services/functions'

const Home = () => {
  const { colorMode } = useColorMode()
  const router = useNavigate()

  const [roomId, setRoomId] = useState('')
  const [password, setPassword] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleStartCall = async () => {
    const data = {
      roomId,
      password,
    }

    try {
      await EnterRoom(data)
      // Redirecionar para a sala de conferência
      setTimeout(() => {
        router(`/roomPage/${roomId}`)
      }, 1500)
    } catch (error) {
      console.log(error);
    
      setIsDialogOpen(true)
    }
  }
  const leastDestructiveRef = React.useRef(null)

  const inputStyles = {
    light: {
      color: '#333',
      placeholderColor: '#000',
      borderColor: '#333',
      focusBorderColor: '#1E67C8',
    },
    dark: {
      color: '#fafafa',
      placeholderColor: '#fafafa',
      borderColor: '#fafafa',
      focusBorderColor: '#1E67C8',
    },
  }

  return (
    <>
      <Flex alignItems={'center'} direction="column">
        <Flex
          direction="column"
          align="center"
          justify="center"
          flex="1"
          height={"100%"}
          py={8}
        >
          <Box textAlign="center" my={8}>
            <Image
              width="220px"
              src="https://vaptmed.com.br/wp-content/uploads/2021/03/VaptMed-Final-4.png"
              alt="Logo VAPTMED"
              mx="auto"
            />
            <Text fontSize="14pt" mt={8}>
              {'⏱️ Entre na sua Sala.'}
            </Text>
          </Box>

          <Box
            maxWidth="400px"
            width="100%"
            bg={colorMode === 'light' ? '#B8D8E8' : 'gray.700'}
            padding={4}
            borderRadius="md"
            boxShadow="md"
          >
            <Flex direction="column" mb={4} padding={5}>
              <Input
                border={`1px solid ${inputStyles[colorMode].borderColor}`}
                color={inputStyles[colorMode].color}
                placeholder="ID da sala"
                _placeholder={{
                  color: inputStyles[colorMode].placeholderColor,
                }}
                mb={2}
                _focus={{
                  borderColor: inputStyles[colorMode].focusBorderColor,
                }}
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
              <Input
                border={`1px solid ${inputStyles[colorMode].borderColor}`}
                color={inputStyles[colorMode].color}
                placeholder="Senha"
                _placeholder={{
                  color: inputStyles[colorMode].placeholderColor,
                }}
                mb={2}
                _focus={{
                  borderColor: inputStyles[colorMode].focusBorderColor,
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Flex>
            <Button
              size="sm"
              rounded="md"
              color={colorMode === 'light' ? 'blue.500' : 'white'}
              bg={colorMode === 'light' ? 'white' : 'primary.500'}
              _hover={{
                color: colorMode === 'light' ? 'white' : 'white',
                bg: colorMode === 'light' ? 'blue.500' : 'blue.500',
              }}
              onClick={handleStartCall}
            >
              Entrar
            </Button>
          </Box>
        </Flex>
      </Flex>

      {/* Diálogo para exibir erro de sala ou senha incorreta */}
      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={leastDestructiveRef} // Passe uma referência vazia para a propriedade leastDestructiveRef
        onClose={() => setIsDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Erro de autenticação
            </AlertDialogHeader>
            <AlertDialogBody>
              A sala ou a senha fornecida está incorreta. Por favor, verifique
              as informações e tente novamente.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={() => setIsDialogOpen(false)}>Fechar</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default Home
