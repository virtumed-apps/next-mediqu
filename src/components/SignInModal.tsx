import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/app'

const LogIn: React.FC = () => {
  const router = useNavigate()
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  })
  const [signInWithEmailAndPassword, , loading, fbError] =
    useSignInWithEmailAndPassword(auth)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await signInWithEmailAndPassword(loginForm.email, loginForm.password)

      // Redirecionar para a rota desejada após o login
      router('/dashboard') // Substitua '/dashboard' pela rota desejada
    } catch (error) {
      // Tratar erros de autenticação
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" w="full">
        <Input
          autoComplete="email"
          required
          name="email"
          placeholder="email"
          type="email"
          onChange={handleChange}
          size="md"
        />
        <Input
          autoComplete="current-password"
          required
          name="password"
          placeholder="password"
          type="password"
          onChange={handleChange}
          size="md"
          my={3}
        />

        {fbError && (
          <Text textAlign="center" color="red" fontSize="10pt">
            {fbError.message}
          </Text>
        )}

        <Button type="submit" isLoading={loading} my={3}>
          Log In
        </Button>
      </Flex>
    </form>
  )
}
export default LogIn
