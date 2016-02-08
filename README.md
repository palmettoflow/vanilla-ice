# vanilla ice - A web development stack built on small community libraries and modules

A Single Page Application Stack built on community driven open source projects.

* virtual-dom (view)
* hyperscript (markup)
* page.js (router)
* pouchdb (data service)
* eventemitter2 (message bus)

# Why

To continue to pursue a common set of modules that encourage re-usability vs
framework lock-in.  By abstracting the business logic in both the
components and services from specific libraries or frameworks and leveraging
reusable multi-purpose libraries and patterns.

- components use hyperscript and/or hyperscript-helpers in a pure render function
along with `linchpin` which is a `event emitter2` module to send events to modify
the state and re-render the application.



> All of these libraries and tools can be exchanged for other libraries or tools that do the same thing.

## Structure

```
- browser.js
- index.html
  - /app
    - index.js
    - /components
      - index.js
      - welcome.js
    - /routes
      - index.js
    - /services
      - index.js
```

## browser.js

```
import main from 'main-loop'
import { create, patch, diff, h } from 'virtual-dom'

import { app, init, render } from './app'

const loop = main(init(), render, { create, patch, diff })
app(loop.update)

document.body.appendChild(loop.target)
```

## app/index.js

```
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
```

## components/index.js

```
const welcome = require('./welcome')
export { welcome }
```

## components/welcome.js

```
import { h } from 'virtual-dom'
import helpers from 'hyperscript-helpers'
import pin from 'linchpin'

const { div, h1, p, header, span, main, a } = helpers(h)

const init = options => ({ title: 'Title Goes Here' })

const render = state =>
  div('.mdl-layout .mdl-js-layout .mdl-layout--fixed-header', [
    header('.mdl-layout__header', [
      div('.mdl-layout__header-row', [
        span('.mdl-layout-title', state.title)
      ])
    ]),
    main('.mdl-layout__content', [
      div('.mdl-grid', [
        h1('Welcome')
      ])
    ])
  ])

export { init, render }
```

## routes/index.js

```
import page from 'page'
import pin from 'linchpin'

const init = (components) => {
  // include all route modules here:
  // index for all route sections

  page('/', () => {
    pin.emit('render', ['animation'], 'fadeIn')
    pin.emit('render', ['route'], 'welcome')
    pin.emit('render', ['model'], components['welcome'].init())
  })

  page()

  // redirect to any page url
  pin.on('route', page)
}

export { init }
```

## services/index.js

```
import PouchDB from 'pouchdb'
import pin from 'linchpin'

const init = () => {
  pin.on('/services/start', (event) => {
    var db = PouchDB(event.object.name)
    // initialize all services
  })
}

export { init }
```

## FAQ

(See Issues)

## license

MIT
