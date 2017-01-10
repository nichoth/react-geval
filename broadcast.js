var h = require('react').createElement
var Event = require('geval')
var xtend = require('xtend')

function broadcast (component, events) {
    var _broadcast = events.reduce(function (acc, ev) {
        var emit
        var _ev = Event(function (_emit) {
            emit = _emit
        })
        acc[ev] = {
            emit: emit,
            subscribe: _ev
        }
        return acc
    }, {})
    function BroadcastComponent (props) {
        var _props = xtend(props, {
            emit: Object.keys(_broadcast).reduce(function (acc, k) {
                acc[k] = _broadcast[k].emit
                return acc
            }, {})
        })

        return h(component, _props, [])
    }

    return {
        view: BroadcastComponent,
        on: Object.keys(_broadcast).reduce(function (acc, k) {
            acc[k] = _broadcast[k].subscribe
            return acc
        }, {})
    }
}

module.exports = broadcast
