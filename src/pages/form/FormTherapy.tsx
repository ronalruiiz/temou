
import { IonCard, IonList, IonContent, IonButton,IonToast, IonCol, IonCardHeader, IonItem, IonPage, IonLabel, IonRow, IonInput, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon } from '@ionic/react';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import axios from '../../helpers/axiosInterceptor';
import { Therapy } from '../../helpers/interfaces';
import moment from 'moment'
import Form from '../../components/Form';

const FormTherapy: React.FC = (props: any) => {
  let { id }: any = useParams();
  
  const [name, setName] = useState()
  const [email, setEmail] = useState()

  const [message, setMessage] = useState()
  const [therapy, setTherapy] = useState<Therapy>()
  const [questions, setQuestions] = useState([])


  const getData = async (callback: Function) => {
    axios.get("/therapy/" + id).then(res => {
      setTherapy(res.data)
      setMessage(res.data.errors)

      let questions = JSON.parse(res.data.questions)
      setQuestions(questions)
      localStorage['questions'] = JSON.stringify(questions);
    }).finally(() => {
    })

  }

  useEffect(() => {
    getData(() => {
    })
  }, []);

  const onRSubmit = async (e: any) => {
    const response:any = await axios.post("/exam",{
      'questions':localStorage['questions'],
      'therapy_id':therapy?.id,
      name,
      email
    })
    setMessage(response?.message)
    location.href = "/"
  }

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
                          <IonInput value={email} onIonChange={(e: any) => setEmail(e.detail.value!)} required type='email' placeholder="Correo electrónico" > </IonInput>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
            <IonRow className='justify-content-center mt-2'>
              <IonCol size-sm="12" size-md="7" size="12">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle >Preguntas</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonList>
                      {questions?.map((question: any, index) =>
                        <IonItem lines="none"  key={index}>
                          <Form question={question} />
                        </IonItem>
                      )}
                    </IonList>

                    <IonButton onClick={onRSubmit} className='mt-4'>
                      Enviar
                    </IonButton>
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

        {message && (
          <IonToast
            isOpen={(message) ? true : false}
            duration={4000}
            keyboardClose={true}
            buttons={[
              {
                text: 'Cerrar',
                role: 'cancel',
              }
            ]}
            message={message}
            position="bottom"
          />
        )}
        { }
      </IonContent>
    </IonPage>
  )
}

export default FormTherapy;