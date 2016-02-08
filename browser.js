import main from 'main-loop'
import { create, patch, diff, h } from 'virtual-dom'

import { app, init, render } from './app'

const loop = main(init(), render, { create, patch, diff })
app(loop.update)

document.body.appendChild(loop.target)
