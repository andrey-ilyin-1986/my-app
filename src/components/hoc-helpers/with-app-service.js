import React                  from 'react'
import { AppServiceConsumer } from '../app-service-context'

const withAppService = Wrapped => props =>
  <AppServiceConsumer>
    { appService => <Wrapped {...props} appService={appService} /> }
  </AppServiceConsumer>

export default withAppService