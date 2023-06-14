import { useColorMode } from '@chakra-ui/react'

import 'react-toastify/dist/ReactToastify.css'
import Layout from '../../components/layout'
import ComponentRoomList from '../../components/ComponentRoomList'
import { PrivateRoute } from '../../routes/PrivateRoute'

const RoomList = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <PrivateRoute>
      <Layout colorMode={colorMode} toggleColorMode={toggleColorMode}>
        <ComponentRoomList />
      </Layout>
    </PrivateRoute>
  )
}

export default RoomList
