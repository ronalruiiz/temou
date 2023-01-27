import { IonButton, IonButtons, IonList, IonContent, IonHeader, IonItem, IonMenuButton, IonPage, IonTitle, IonToolbar,IonLabel } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import temonet from '../images/img-temonet-logo-sf.png'
import { connect } from 'react-redux';
import actions from '../../actions/therapy';
import axios from '../../helpers/axiosInterceptor';
import {useEffect, useState} from 'react';

const Therapies: React.FC = (props: any) => {

  const { name } = useParams<{ name: string; }>();
  
  // useEffect(() => {
  //   const therapies = async axios.get("/therapy")
  // }
  // });
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Mis Terapias</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={name} />
        
        <IonList lines="full">
        <IonItem>
          <IonLabel>Full Lines</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Full Lines</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Full Lines</IonLabel>
        </IonItem>
      </IonList>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state:any) => {
	return { state: state.therapy }
}

export default connect(mapStateToProps, actions)(Therapies);
