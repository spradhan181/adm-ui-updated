
import Login from './login/Login';
import { Route, Switch } from 'react-router-dom'
import SignUp from "./signup/SignUp";
import Search from "./search/Search"
import SearchResponse from './search/searchresponse/SearchResponse';
import ForgotPassword from './login/forgotpassword/ForgotPassword';


function App() {
  return (
    <div>
      <Switch>
            <Route path="/forgot" component={ForgotPassword} />
            <Route path="/response" component={SearchResponse} />
            <Route path="/search" component={Search} />
            <Route path="/signup" component={SignUp} />
            <Route path="/" exact component={Login} />
          </Switch>
    </div>
  );
}

export default App;
