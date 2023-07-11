import {
  Autocomplete,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";

const Components = () => {
  return (
    <Container>
      <Box mt={4}>
        <Typography variant='h3' color='primary'>
          Typhography
        </Typography>
        <Typography variant='h1' color='primary'>
          Material components h1
        </Typography>
        <Typography variant='h2' color='primary'>
          Material components h2
        </Typography>
        <Typography variant='h3' color='primary'>
          Material components h3
        </Typography>
        <Typography variant='h4' color='primary'>
          Material components h4
        </Typography>
        <Typography variant='h5' color='primary'>
          Material components h5
        </Typography>
        <Typography variant='h6' color='primary'>
          Material components h6
        </Typography>
      </Box>
      <Box mt={4}>
        <Typography variant='h3' color='primary'>
          Button
        </Typography>
        <Box display='flex' gap={2} mb={2}>
          <Button color='success' variant='contained'>
            Button
          </Button>
          <Button color='success' variant='outlined'>
            Button
          </Button>
          <Button color='success' variant='text'>
            Button
          </Button>
        </Box>
        <Box display='flex' gap={2} mb={2}>
          <Button color='info' variant='contained'>
            Button
          </Button>
          <Button color='info' variant='outlined'>
            Button
          </Button>
          <Button color='info' variant='text'>
            Button
          </Button>
        </Box>
        <Box display='flex' gap={2} mb={2}>
          <Button color='secondary' variant='contained'>
            Button
          </Button>
          <Button color='secondary' variant='outlined'>
            Button
          </Button>
          <Button color='secondary' variant='text'>
            Button
          </Button>
        </Box>
        <Box display='flex' gap={2} mb={4}>
          <Button color='error' variant='contained'>
            Button
          </Button>
          <Button color='error' variant='outlined'>
            Button
          </Button>
          <Button color='error' variant='text'>
            Button
          </Button>
        </Box>
      </Box>
      <Box mt={4}>
        <Typography variant='h3' color='secondary'>
          TextField
        </Typography>
        <Box mt={2} mb={2}>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={["option 1", "option 2", "option 3"]}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label='Autocomplete' />
            )}
          />
        </Box>
        <Box display='flex' mb={2} mt={2}>
          <TextField
            id='outlined-basic'
            label='Outlined'
            variant='outlined'
            fullWidth
          />
        </Box>
        <Box display='flex' mb={2}>
          <TextField
            id='filled-basic'
            label='Filled'
            variant='filled'
            fullWidth
          />
        </Box>
        <Box display='flex' mb={2}>
          <TextField
            id='standard-basic'
            label='Standard'
            variant='standard'
            fullWidth
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Components;
