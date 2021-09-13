import React from 'react'
import {render} from 'react-dom'
import '@scss/index.scss'
import {App} from './react/App'
import UserAPI from '@core/classes/UserAPI'

const testUser = {
  email: "tester@test.com",
  password: "111111111"
}

async function testAPI() {
  console.log(await UserAPI.getCurrentUser());
  console.log(await UserAPI.toLogin(testUser));
  console.log(await UserAPI.getCurrentUser());
  console.log(await UserAPI.toLogout());
  console.log(await UserAPI.getCurrentUser());
}

testAPI();

render(<App />, document.getElementById('root'))
