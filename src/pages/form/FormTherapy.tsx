
import { IonCard, IonContent, IonHeader, IonCol, IonCardHeader, IonItem, IonPage, IonLabel, IonRow, IonInput, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';
import { useParams } from 'react-router';
import { useState } from 'react';
import { useIonViewWillEnter } from "@ionic/react";
import axios from '../../helpers/axiosInterceptor';
import { Therapy } from '../../helpers/interfaces';
import moment from 'moment'

const FormTherapy: React.FC = (props: any) => {
  let { id }: any = useParams();
  const [therapy, setTherapy] = useState<Therapy>()
  const [message, setMessage] = useState()
  const [name, setName] = useState()

  useIonViewWillEnter(() => {
    async function getTherapy() {
      const response = await axios.get("/therapy/" + id)
      setTherapy(response.data)
      setMessage(response.data.errors)
    }
    getTherapy();

  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        {therapy != undefined ? (
          <>
            <IonRow className='justify-content-center'>
              <IonCol size-sm="12" size-md="7" size="12">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle >{therapy?.name}</IonCardTitle>
                    <IonCardSubtitle>Creado: {moment(therapy?.created_at).format("D-M-Y")}</IonCardSubtitle>
                  </IonCardHeader>

                  <IonCardContent>
                    {therapy?.description}
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
            <IonRow className='justify-content-center mt-2'>
              <IonCol size-sm="12" size-md="7" size="12">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle >Datos del Usuario</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonRow className='justify-content-between'>
                      <IonCol size-sm="12" size-md="6" size="12">
                        <IonItem >
                          <IonLabel position="floating">Nombre</IonLabel>
                          <IonInput value={name} onIonChange={(e: any) => setName(e.detail.value!)} required type='text' placeholder="Nombre del usuario" > </IonInput>
                        </IonItem>
                      </IonCol>
                      <IonCol size-sm="12" size-md="6" size="12">
                        <IonItem >
                          <IonLabel position="floating">Correo electrónico</IonLabel>
                          <IonInput value={name} onIonChange={(e: any) => setName(e.detail.value!)} required type='text' placeholder="Correo electrónico" > </IonInput>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </>
        ) : (
          <IonRow className='justify-content-center'>
            <IonCol size-sm="12" size-md="6" size="12">
              <IonCard>
                <IonCardContent className='ion-text-center'>
                  Terapía no identificada o no disponible
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        )}
      </IonContent>
    </IonPage>
  )
}

export default FormTherapy;