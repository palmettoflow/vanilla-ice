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
