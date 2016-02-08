import PouchDB from 'pouchdb'
import pin from 'linchpin'

const init = () => {
  pin.on('/services/start', (event) => {
    var db = PouchDB(event.object.name)
    // initialize all services
  })
}

export { init }
