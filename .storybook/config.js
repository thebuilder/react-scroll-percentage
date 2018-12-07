import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { withOptions } from '@storybook/addon-options'
import pck from '../package.json'
import 'intersection-observer'
import './base.css'

addDecorator(
  withOptions({
    name: pck.name,
    url: pck.repository ? pck.repository.url : null,
    showAddonPanel: true,
    addonPanelInRight: true,
  }),
)

/**
 * Use require.context to load dynamically: https://webpack.github.io/docs/context.html
 */
const req = require.context('../stories', true, /story\.js$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
