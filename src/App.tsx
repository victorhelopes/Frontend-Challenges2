import { Home } from './page/Home';

import { ThemeProvider } from '@mui/material';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
        <Home/>
    </ThemeProvider>
  );
}

export default App;
