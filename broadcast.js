var h = require('react').createElement
var xtend = require('xtend')
var Bus = require('event-emitter-demux')

function broadcast (component, events) {
    var bus = Bus(events)

    function BroadcastComponent (props) {
        var _props = xtend(props, {
            emit: bus.write
        })
        return h(component, _props, [])
    }

    return {
        view: BroadcastComponent,
        on: bus.on
    }
}

module.exports = broadcast
