import { Button, styled, TextField } from '@mui/material';

const StyledTextField = styled(TextField)(({ theme }) => ({
  border: theme.palette.text.primary,
}));

const StyledTextField2 = styled(TextField)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.main,
}));

const ComponentDiv = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

export { StyledTextField, StyledTextField2, StyledButton, ComponentDiv };
