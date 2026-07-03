// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// //aimport App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     {/* <App /> */}
//   </StrictMode>
// )

function CustomRender(reactElement,mainContainer) {
    element=document.createElement(reactElement.type);
    for (const prop in reactElement.props) {
        element[prop]=reactElement.props[prop];
    }
    element.textContent=reactElement.children;
    mainContainer.appendChild(element);
}
const reactElement={
    type:'a',
    props:{
        href:'https://www.google.com',
        target:'_blank',
    },
    children:'Click me to visit Google'
}
const mainContainer = document.getElementById('root');
CustomRender(reactElement,mainContainer);
