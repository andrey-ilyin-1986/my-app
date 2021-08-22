import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'


/////////////////////
import { Provider } from 'react-redux'
import AppService from './services/app-service'
import { AppServiceProvider } from './components/app-service-context'
import store from './store'
import { withAppService } from './components/hoc-helpers'
const appService = new AppService();
//////////////////
const AppWithService = withAppService(App);

ReactDOM.render(
    <Provider store={store}>
        <AppServiceProvider value={appService}>
            <AppWithService />
        </AppServiceProvider>
    </Provider>,
    document.getElementById('root')
)