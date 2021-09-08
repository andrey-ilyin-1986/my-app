import React            from 'react'
import { AppConsumer }  from '../app-context'

const withAppProps = Wrapped => props =>
  <AppConsumer>
    { appProps => <Wrapped { ...{ ...props, ...appProps } } /> }
  </AppConsumer>

export default withAppProps