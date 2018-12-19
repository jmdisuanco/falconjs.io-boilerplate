import {h, Render, Observable} from '@falconjs.io/falcon'
import {Row, Col} from 'falconjs-component-flexgrid'
import 'falconjs-component-flexgrid/dist/index.css'
let StateStore = {
  data: {
      fName: 'FalconJS',
      lName: 'Framework',
      age:25,
      fullName () {
              return this.fName + ' ' + this.lName
          },
      old () {
          let oldornot='Young'
          if(this.age > 50){
              oldornot = 'Old'
          }
          return oldornot
      }
  }
}

let App = new Observable(StateStore)

/*
Service Worker
*/

let registerSW = async () => {
  if ('serviceWorker' in navigator) { // (2)
    try {
      console.log('add')
      await navigator.serviceWorker.register('./falconjs-sw.js'); // (3)
    } catch (e) {
      console.log('ServiceWorker registration failed. Sorry about that.'); // (4)
    }
  }
}

window.addEventListener('load', (e) =>{
  registerSW()
})


let Display = () => {
return(
<div onupdate={ ()=>{console.log('Display Component has been updated')} }>
  <h1>{App.state.fullName}</h1>
  <div>{App.state.age}</div>
  <div>{App.state.old}</div>
</div>     
)
}

let Controller = () =>{      
return(
  <div >
    <input value = {App.state.fName} oninput={(e)=>{App.state.fName = e.target.value }}></input>
    <input value = {App.state.lName} oninput={(e)=>{App.state.lName = e.target.value }}></input>
    <input type='range' value={App.state.age}  oninput={(e)=>{App.state.age = e.target.value }} ></input>
  </div>
)
}

let View = ()  => {
return(
  <div>
   <Display/>
   <Controller/>
   <Row gutter={40} >
   <Col xs={12}><div><img src={require("./images/logo.png")} height="150"/></div></Col>
   <Col xs={12} md={3} lg={4}><div>1</div></Col>
   <Col xs={12} md={3} lg={4}><div>2</div></Col>
   <Col xs={12} md={6} lg={4}><div>3</div></Col>
 </Row>
  </div>
)
} 

const render = Render(View, document.getElementById('root'))

render(App)
App.observe('fName', () =>{render(App)} )
App.observe('lName', () =>{render(App)} )
App.observe('age', () =>{render(App)} )



