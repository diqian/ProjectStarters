import React from 'react'
import { render } from 'react-dom'
import App from '../components/App'

render(
    //define the encompassing component,
    //DOM element we want to mount to 
  <App/>,
  document.getElementById('app')
)
