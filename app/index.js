import { h } from 'virtual-dom'
import helpers from 'hyperscript-helpers'
import pin from 'linchpin'
import { set, lensPath } from 'ramda'

const { div } = helpers(h)

const routes = require('./routes')
const services = require('./services')
const components = require('./components')


const init = () => ({
  route: 'welcome',
  animation: 'fadeIn',
  model: components.welcome.init()
})


const app = (update) => {
  var state = init()
  services.init()
  routes.init(components)

  pin.on('render', (key, data) => {
    state = set(lensPath(key), data, state)
    update(state)
  })
}

const render = (state) => {
  return div('.animated .' + state.animation, [
    state.route ? components[state.route].render(state.model) : null
  ])
}

export { app, init, render }
