import {Route, Switch, Redirect} from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import JobsPage from './pages/JobsPage'
import JobDetail from './pages/JobDetail'
import ProtectRoute from './pages/ProtectRoute'
import NotFoundPage from './pages/NotFoundPage'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <ProtectRoute exact path="/" component={HomePage} />
      <ProtectRoute exact path="/jobs" component={JobsPage} />
      <ProtectRoute exact path="/jobs/:id" component={JobDetail} />
      <Route path="/not-found" component={NotFoundPage} />
      <Redirect to="not-found" />
    </Switch>
  </>
)

export default App
