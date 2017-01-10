var test = require('tape')
var broadcast = require('../broadcast')
var h = require('react').createElement
var ReactDom = require('react-dom')

var root = document.createElement('div')
document.body.appendChild(root)

function Elmt (props) {
    process.nextTick(function () {
        props.emit.foo('test')
        props.emit.bar('bar test')
    })
    return h('div', {}, [])
}

test('emit events', function (t) {
    t.plan(2)
    var broadcaster = broadcast(Elmt, ['foo', 'bar'])
    broadcaster.on.foo(function (ev) {
        t.equal(ev, 'test', 'should emit events')
    })
    broadcaster.on.bar(function (ev) {
        t.equal(ev, 'bar test', 'should emit events')
    })
    ReactDom.render(h(broadcaster.view), root)
})

