import React from 'react'
import {Provider} from 'react-redux'
import {Router} from '@react/Router'
import {store} from '@redux/store'
import {CookiesProvider} from 'react-cookie'


export const App: React.FC = () => {
    return (
        <CookiesProvider>
          <Provider store={store}>
            <Router />
          </Provider>
        </CookiesProvider>
      )
}