import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
//import App from './App.jsx'

const ReactElement1={
    type:'a',
    props:{
        href:'https://www.google.com',
        target:'_blank',
    },
    children:'Click me to visit Google'
}
function MyAPP(){
  return (
    <>
      <h1>Hey, Hello World</h1>
    </>
  )
}
const str="Hello World.In sha Allah you will be an full stack developer by the end of summer break."
const ReactElement= React.createElement(
  'h1',
  null,
  str
)
createRoot(document.getElementById('root')).render(
  ReactElement
)
