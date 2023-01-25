import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { apps,key, appsOutline, body, bodyOutline, construct, constructOutline, home, homeOutline, statsChart, statsChartOutline } from 'ionicons/icons';
import './Menu.css';
import temonet from './images/img-temonet-sf.png'
import actions from '../actions/auth';
import { connect } from 'react-redux';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Escritorio',
    url: '/dashboard/home',
    iosIcon: homeOutline,
    mdIcon: home
  },
  {
    title: 'Mis Pacientes',
    url: '/dashboard/patients',
    iosIcon: bodyOutline,
    mdIcon: body
  },
  {
    title: 'Mis Terapias',
    url: '/dashboard/therapies',
    iosIcon: appsOutline,
    mdIcon: apps
  },
  {
    title: 'Crear Terapias',
    url: '/dashboard/typetherapy',
    iosIcon: constructOutline,
    mdIcon: construct
  },
  {
    title: 'Reportes de Resultados',
    url: '/dashboard/reports',
    iosIcon: statsChartOutline,
    mdIcon: statsChart
  }
];

const Menu: React.FC = (props: any) => {
  const location = useLocation();

  const logout = () => {
    props.logout()
    window.location.href = '/auth/login'
  }


  return (
    <IonMenu contentId="main-content"  side='start'>
      <IonContent>
        <img src={temonet} width="200" />
        <IonListHeader></IonListHeader>
        {appPages.map((appPage, index) => {
          return (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem button className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>

          );
        })}
        <IonMenuToggle key={`logout`} autoHide={false}>
              <IonItem button routerDirection="none" lines="none" onClick={()=>logout()}>
                <IonIcon slot="start" ios={key} md={key} />
                <IonLabel>Cerrar Sesión</IonLabel>
              </IonItem>
            </IonMenuToggle>
      </IonContent>
    </IonMenu>
  );
};

const mapStateToProps = (state: any) => {
  return { state: state.auth }
}

export default connect(mapStateToProps, actions)(Menu);
