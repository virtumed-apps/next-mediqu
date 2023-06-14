import { Flex, Box, Heading, Text, Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

const NotFound = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <Flex
      align="center"
      justify="center"
      height="100vh"
      flexDirection="column"
    >
      <Box textAlign="center" maxWidth="400px">
        <Heading as="h1" size="2xl" mb={4}>
          404 - Página não encontrada
        </Heading>
        <Text fontSize="xl" mb={8}>
          A página que você está procurando não existe ou foi movida.
        </Text>
        <Button
          leftIcon={<ArrowBackIcon />}
          colorScheme="teal"
          variant="solid"
          onClick={goBack}
        >
          Voltar
        </Button>
      </Box>
    </Flex>
  );
};

export default NotFound;
