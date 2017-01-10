# react geval

An event interface for react.

## install

    $ npm install react-geval

## example
```js
var test = require('tape')
var broadcast = require('../broadcast')
var subscribe = require('../subscribe')
var h = require('react').createElement
var ReactDom = require('react-dom')
var struct = require('observ-struct')

var root = document.createElement('div')
document.body.appendChild(root)

test('emit events', function (t) {
    t.plan(2)

    function Elmt (props) {
        process.nextTick(function () {
            props.emit.foo('test')
            props.emit.bar('bar test')
        })
        return h('div', {}, [])
    }

    var broadcaster = broadcast(Elmt, ['foo', 'bar'])
    broadcaster.on.foo(function (ev) {
        t.equal(ev, 'test', 'should emit events')
    })
    broadcaster.on.bar(function (ev) {
        t.equal(ev, 'bar test', 'should emit events')
    })
    ReactDom.render(h(broadcaster.view), root)
})

test('listen to events', function (t) {
    t.plan(2)
    var i = 0
    var expected = ['test', 'test2']
    function SubElmt (props) {
        t.equal(props.test, expected[i++], 'should listen to events')
        return null
    }
    var state = struct({ test: 'test' })
    var Subscriber = subscribe(SubElmt, state)
    ReactDom.render(h(Subscriber), root, function () {
        state.set({ test: 'test2' })
    })
})

test('event loop', function (t) {
    t.plan(2)
    var expected = ['', 'test']
    var i = 0
    function Elmt (props) {
        if (i > 1) return null
        process.nextTick(function () {
            props.emit.foo('test')
        })
        t.equal(props.test, expected[i++], 'should get state changes')
        return null
    }

    var state = struct({ test: '' })
    var emitter = broadcast(Elmt, ['foo'])
    var View = subscribe(emitter.view, state)
    emitter.on.foo(function (ev) {
        state.set({ test: ev })
    })
    ReactDom.render(h(View), root)
})
```
