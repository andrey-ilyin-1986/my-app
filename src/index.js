import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'


/////////////////////
import { connect, Provider } from 'react-redux'
import AppService from './services/app-service'
import { AppServiceProvider } from './components/app-service-context'
import store from './store'
import { withAppService } from './components/hoc-helpers'
import { pagesLoaded, pagesRequested } from './actions'
//import { compose } from './utils'

const appService = new AppService();

const mapStateToProps = (state) => {
    return state;
}
const mapDispatchToProps = {
    pagesLoaded,
    pagesRequested
}
/*
const NewApp = compose(
    withAppService(),
    connect(mapStateToProps, mapDispatchToProps)
)(App)
*/
const NewApp = withAppService(connect(mapStateToProps, mapDispatchToProps)(App))
//////////////////


ReactDOM.render(
    <Provider store={store}>
        <AppServiceProvider value={appService}>
            <NewApp />
        </AppServiceProvider>
    </Provider>,
    document.getElementById('root')
)