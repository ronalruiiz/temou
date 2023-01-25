import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader,IonGrid, IonCol, 
  IonRow, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useLocation,useHistory  } from 'react-router-dom';
import { clipboardOutline,menu } from 'ionicons/icons';

interface AppContent {
  title: string;
  mdIcon: string;
  desc: string;
}

const appContent: AppContent[] = [
  {
    title: 'fonologica',
    mdIcon: clipboardOutline,
    desc: ' Tipo de dislexia fonologica o indirecta'
  },
  {
    title: 'superficial',
    mdIcon: clipboardOutline,
    desc: ' Dificultad para memorizar'
  },
  {
    title: 'mixta',
    mdIcon: clipboardOutline,
    desc: ' Tipo de dislexia mixta o profunda'
  },
  {
    title: 'nueva dislexia',
    mdIcon: clipboardOutline,
    desc: ' Nuevo tipo de dislexia desconocida'
  },
  {
    title: 'dislexia tipo 1',
    mdIcon: clipboardOutline,
    desc: ' Nuevo tipo de dislexia desconocida'
  }
]


const TypeTherapy: React.FC = (props:any) => {
  
  const history = useHistory();
  const location = useLocation();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonItem>
            <IonTitle>Crear Terapia</IonTitle>
            <IonItem>
              <IonAvatar slot="start">
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
              </IonAvatar>
              <IonLabel>Item Avatar</IonLabel>
            </IonItem>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonButtons>
            <IonButton>
              <IonIcon slot='icon-only' icon={menu}></IonIcon>
            </IonButton>
          </IonButtons>


          <IonTitle size="large">Crear Terapia</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonGrid>
        <IonRow>
          {appContent.map((appContents) => {
            return (
              <IonCol key={appContents.title} size-sm="12" size-md="6" size="12">
                <IonCard id='cont-cont' routerLink={"/dashboard/createtherapy/"+appContents.title}>
                  <IonCardHeader>
                    <IonCardTitle style={{textTransform:"capitalize"}} > {appContents.title} </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonIcon slot="start" md={appContents.mdIcon} />{appContents.desc}
                  </IonCardContent>
                </IonCard>
              </IonCol>
            );
          })}
        </IonRow>
      </IonGrid>
      </IonContent>

    </IonPage>
  );
};

export default TypeTherapy;
