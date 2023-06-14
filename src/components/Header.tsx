import { useRef, useState } from 'react'
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useDisclosure,
  Icon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { FaSignOutAlt } from 'react-icons/fa'
import AuthButtons from './AuthButtons'
import { Link, useLocation } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/app'

const MenuItem = ({ children, to, colorMode, isActive }: any) => (
  <Link to={to}>
    <Text
      as="span"
      whiteSpace="nowrap"
      _hover={{
        color: colorMode === 'light' ? 'orange' : 'orange',
      }}
      fontWeight={isActive ? 'bold' : 'normal'}
      color={
        isActive ? (colorMode === 'light' ? 'orange' : 'orange') : undefined
      }
    >
      {children}
    </Text>
  </Link>
)

const MenuToggle = ({ toggle, color }: any) => (
  <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
    <HamburgerIcon
      w={6}
      h={6}
      color={color === 'light' ? 'blue.500' : 'white'}
    />
  </Box>
)

const NavBar = ({ colorMode, toggleColorMode }: any) => {
  const [user] = useAuthState(auth)
  const { isOpen, onToggle } = useDisclosure()
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState(false)
  const cancelRef = useRef<HTMLButtonElement | null>(null)
  const location = useLocation()

  const openLogoutModal = () => {
    setIsOpenLogoutModal(true)
  }

  const closeLogoutModal = () => {
    setIsOpenLogoutModal(false)
  }

  const handleLogout = () => {
    auth.signOut()
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      borderBottom={'1px solid #458CEA'}
      p={4}
      bg={colorMode === 'light' ? 'white' : 'gray.700'}
      color="white"
    >
      <Flex align="center">
        <Text
          color={colorMode === 'light' ? 'blue.500' : 'white'}
          fontSize="xl"
          fontWeight="bold"
        >
          MEET-VAPTMED
        </Text>
      </Flex>
      <MenuToggle color={colorMode} toggle={onToggle} />
      <Box
        m={{ base: 6, md: 0 }}
        display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
      >
        <Stack
          color={colorMode === 'light' ? 'blue.500' : 'white'}
          spacing={4}
          align="center"
          justify={['center', 'space-between', 'flex-end', 'flex-end']}
          direction={['column', 'row', 'row', 'row']}
        >
          <MenuItem to="/" isActive={location.pathname === '/'}>
            Home
          </MenuItem>
          {user && (
            <>
              <MenuItem
                to="/dashboard"
                isActive={location.pathname === '/dashboard'}
              >
                Dashboard
              </MenuItem>
              <MenuItem to="/room" isActive={location.pathname === '/room'}>
                Salas
              </MenuItem>
              <Icon
                as={FaSignOutAlt}
                onClick={openLogoutModal}
                cursor="pointer"
                ml={2}
              />
              <AlertDialog
                isOpen={isOpenLogoutModal}
                leastDestructiveRef={cancelRef}
                onClose={closeLogoutModal}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Logout Confirmation
                    </AlertDialogHeader>
                    <AlertDialogBody>
                      Are you sure you want to log out?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={closeLogoutModal}>
                        Cancel
                      </Button>
                      <Button colorScheme="red" onClick={handleLogout} ml={3}>
                        Logout
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </>
          )}
          {!user && <AuthButtons />}
          <Button variant="link" onClick={toggleColorMode} colorScheme="blue">
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Stack>
      </Box>
    </Flex>
  )
}

export default NavBar
