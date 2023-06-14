import { useColorMode } from '@chakra-ui/react'

import 'react-toastify/dist/ReactToastify.css'
import Home from '../../components/Home'
import Layout from '../../components/layout'

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Layout colorMode={colorMode} toggleColorMode={toggleColorMode}>
      <Home />
    </Layout>
  )
}

export default Index
