import React from 'react'
import { addDecorator, addParameters, configure } from '@storybook/react'
import { create } from '@storybook/theming'
import 'intersection-observer'
import pck from '../package'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
html {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  color: #0c0c0c;
  font-size: 16px;
}
body {
  margin: 0;
  padding: 0;
}
`

addParameters({
  options: {
    theme: create({
      base: 'dark',
      brandTitle: pck.name,
      brandUrl: pck.repository.url,
    }),
    isFullscreen: false,
    panelPosition: 'bottom',
  },
})

addDecorator(storyFn => (
  <>
    <GlobalStyles suppressMultiMountWarning />
    {storyFn()}
  </>
))

/**
 * Use require.context to load dynamically: https://webpack.github.io/docs/context.html
 */
const req = require.context('../stories', true, /story\.tsx$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
