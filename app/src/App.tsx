import React from 'react'
import './App.css'
import './api/io'
import {Toaster} from 'react-hot-toast'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import Notis from './pages/Notis'

const queryClient = new QueryClient()

function App() {
  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <Toaster position="bottom-center" />
        <h1>notis app</h1>
        <BrowserRouter>
          <Switch>
            <Route path="/notis">
              <Notis />
            </Route>
            <Redirect to="/notis" />
          </Switch>
        </BrowserRouter>
      </QueryClientProvider>
    </main>
  )
}

export default App
