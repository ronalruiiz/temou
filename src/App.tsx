import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route,Redirect } from 'react-router-dom';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Index';
import RestrictedRoute from './helpers/restrictedRoutes';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet >
          <RestrictedRoute path='/' exact={true}/>
          <Route path={`/auth/login`} component={Login} exact={true}/>
          <Route path="/dashboard" component={Dashboard} />
        </IonRouterOutlet>  
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
