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
