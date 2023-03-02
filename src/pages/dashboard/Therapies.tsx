import { IonCardTitle, IonButtons, IonCard, IonContent, IonHeader, IonCardContent, IonItem, IonMenuButton, IonPage, IonRow, IonButton, IonTitle, IonToolbar, IonCardSubtitle, IonCardHeader, IonGrid, IonCol, IonInput, IonIcon } from '@ionic/react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import actions from '../../actions/therapy';
import { useEffect, useState } from 'react';
import axios from '../../helpers/axiosInterceptor';
import ExploreContainer from '../../components/ExploreContainer';
import moment from 'moment'
import {Therapy} from '../../helpers/interfaces';
import {apiConstants} from "../../helpers/constants"
import { calendarSharp, documentSharp } from 'ionicons/icons';


const Therapies: React.FC = (props: any) => {

  const { name } = useParams<{ name: string; }>();
  const [search, setSearch] = useState("")
  const [therapies, setTherapies] = useState<Therapy[]>()
 
  useEffect(() => {
    async function getTherapies() {
      const response = await axios.get("/therapy")
      setTherapies(response.data)
    }
    getTherapies()
  }, []);

  const deleteTherapy = async (id) => {
    const response = await axios.delete("/therapy/"+id)
    setTherapies(response.data)
    
  }

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

        <IonGrid>
          <IonRow className='justify-content-center mt-4'>
            <IonCol size-sm="12" size-md="4" size="12">
              <IonItem>
                <IonInput value={search} onIonChange={(e: any) => setSearch(e.detail.value!)} required type='text' placeholder="Busqueda por nombre" />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>

            {therapies?.filter((therapy => therapy.name.toLowerCase().includes(search?.toLowerCase())))
              .map((therapy: any) => {

                return (
                  <IonCol key={therapy.id} size-sm="12" size-md="4" size="12">
                    <IonCard>
                      <IonCardHeader>
                        <IonCardTitle >{therapy.name}</IonCardTitle>
                        <IonCardSubtitle> <IonIcon md={calendarSharp}/> Creado: {moment(therapy.created_at).format("D-M-Y")}</IonCardSubtitle>
                      </IonCardHeader>

                      <IonCardContent>
                      <IonIcon md={documentSharp}/>{'\u00A0'}{therapy.description}
                      </IonCardContent>
                      {/* <IonButton fill="clear">Editar</IonButton> */}
                      <IonButton onClick={(()=>deleteTherapy(therapy.id))} fill="clear">Eliminar</IonButton>
                      <IonButton  onClick={()=>navigator.clipboard.writeText(apiConstants.clientUrl+"/form/"+therapy.id)} fill="clear">Copiar URL</IonButton>
                    </IonCard>
                  </IonCol>)
              })
            }

          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: any) => {
  return { state: state.therapy }
}

export default connect(mapStateToProps, actions)(Therapies);
