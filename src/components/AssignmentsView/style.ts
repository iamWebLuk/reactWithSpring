import { styled, TextField } from '@mui/material';

const theme = localStorage.getItem('theme');
console.log(theme == 'dark');
interface TextFieldProps {
  mood: string;
}
const StyledTextField = styled(TextField)<TextFieldProps>(({ mood }) => ({
  fieldSet: {
    borderColor: mood == 'dark' && 'white',
  },
}));

export { StyledTextField };
