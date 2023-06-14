import { useColorMode } from '@chakra-ui/react'
import Layout from '../../components/layout'
import DashboardForm from '../../components/DashboardForm'
import { PrivateRoute } from '../../routes/PrivateRoute'

const Form = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <PrivateRoute>
      <Layout colorMode={colorMode} toggleColorMode={toggleColorMode}>
        <DashboardForm />
      </Layout>
    </PrivateRoute>
  )
}

export default Form
