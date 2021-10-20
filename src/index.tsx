import { StrictMode } from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from 'styled-components'

import { App } from './app'
import { ResetCss, theme } from './styles'

render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />

      <ResetCss />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
)
