var React = require('react')
var h = React.createElement
var xtend = require('xtend')

function subscribe (component, observable) {
    var Subscriber = React.createClass({
        getInitialState: function () {
            return observable()
        },
        componentDidMount: function () {
            var self = this
            this.removeListener = observable(function onChange (state) {
                self.setState(state)
            })
        },
        componentWillUnmount: function () {
            this.removeListener()
        },
        render: function () {
            var _props = xtend(this.props, this.state)
            return h(component, _props, [])
        }
    })

    return Subscriber
}

module.exports = subscribe
