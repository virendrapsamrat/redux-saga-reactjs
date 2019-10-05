import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import Counter from './Counter'
import reducer from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

const action = type => store.dispatch({type})


// const sagaMiddleware = createSagaMiddleware()
// const store = sagaMiddleware.run(rootSaga)
// const store = createStore(reducer)

// const action = type => store.dispatch({type})

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')} 
      onIncrementIfOdd={()=> action('INCREMENT_IF_ODD')}
      clear={()=> action('CLEAR')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')}
      onIncrementFive={() => action('ONINCREMENTFIVE')} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
