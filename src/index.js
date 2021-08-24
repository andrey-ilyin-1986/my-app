import                          'bootstrap/dist/css/bootstrap.min.css'
import React                    from 'react'
import ReactDOM                 from 'react-dom'
import { Provider }             from 'react-redux'
import App                      from './components/app'
import AppService               from './services/app-service'
import { AppServiceProvider }   from './components/app-service-context'
import store                    from './store'

const appService = new AppService()

ReactDOM.render(
    <Provider store={store}>
        <AppServiceProvider value={appService}>
            <App />
        </AppServiceProvider>
    </Provider>,
    document.getElementById('root')
)