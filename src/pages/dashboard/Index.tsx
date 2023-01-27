import { IonSplitPane,IonRouterOutlet } from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Menu from '../../components/Menu';
import CreateTherapy from './CreateTherapy/CreateTherapy';
import Home from './Home';
import Patients from './Patients';
import Therapies from './Therapies';
import PrivateRoute from '../../helpers/privateRoutes';
import Reports from './Reports';
import TypeTherapy from './TypeTherapy';

interface RouteProps {
    match?: any,
}
  
const DashboardIndex: React.FC<RouteProps> = ({ match }) => (
    <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id='main'>
                <Redirect exact from={`${match.url}/`} to={`${match.url}/home`} />
                <PrivateRoute path={`${match.url}/home`} component={Home} exact={true}/>
                <PrivateRoute path={`${match.url}/patients`} component={Patients} exact={true}/>
                <PrivateRoute path={`${match.url}/therapies`} component={Therapies} exact={true}/>
                <PrivateRoute path={`${match.url}/typetherapy`} component={TypeTherapy} exact={true}/>
                <PrivateRoute path={`${match.url}/createtherapy/:type`} component={CreateTherapy} exact={true}/>
                <PrivateRoute path={`${match.url}/reports`} component={Reports} exact={true}/>
            </IonRouterOutlet>
    </IonSplitPane>
);

export default DashboardIndex;