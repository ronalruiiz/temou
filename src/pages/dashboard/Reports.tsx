import { IonAvatar, IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonModal, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { download, save, search, close } from 'ionicons/icons';
import LineChart from '../../charts/LineaChart';
import './../../assets/scss/custom/pages/reports.scss'
import BarCharts from '../../charts/BarCharts';
import RadarCharts from '../../charts/RadarCharts';
import LineDos from '../../charts/LineDos';
import { useEffect, useState } from 'react';
import axios from '../../helpers/axiosInterceptor';
import moment from 'moment'

const ReportesdeResultado: React.FC = () => {
  const [users, setUsers] = useState<[]>()
  const [search, setSearch] = useState("")
  const [isOpen, setIsOpen] = useState(false);
  const [exams, setExams] = useState([])
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function usersExam() {
      const response = await axios.get("/users-exams")
      setUsers(response.data)
    }
    usersExam()
  }, []);


  const onResolveExams = async (userid) => {
    const response: any = await axios.get("/exam/" + userid)
    setExams(response.data)
    setLoader(false)
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Reportes de Resultados</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow className='justify-content-between mt-4'>
            <IonCol size-sm="12" size-md="4" size="12">
              <IonItem>
                <IonInput value={search} onIonChange={(e: any) => setSearch(e.detail.value!)} required type='text' placeholder="Busqueda por nombre" />
              </IonItem>
            </IonCol>
            <IonCol size-sm="12" size-md="4" size="12">
              <IonItem lines='none'>
                <button color='primary' className="btn btn-primary" slot='end'><IonIcon icon={download} /> Generar Reporte</button>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>


        <IonList>
          {users?.filter(((user: any) => user.name.toLowerCase().includes(search?.toLowerCase())))
            .map((user: any) => {
              return (
                <IonItem key={user.id}>
                  <IonAvatar>
                    <img alt="Silhouette of a person's head" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" />
                  </IonAvatar>
                  <IonToolbar>
                    <IonLabel className='nombres-estudiantes'>{user.name} | {user.email}</IonLabel>
                    <IonButton color="tertiary" slot='end'>
                      Informacion
                    </IonButton>
                    <IonButton color="danger" slot='end'>
                      Dashboard
                    </IonButton>
                    <IonButton onClick={() => { onResolveExams(user.id); setLoader(true); setIsOpen(true) }} color="success" slot='end'>
                      Dashboard
                    </IonButton>
                  </IonToolbar>
                </IonItem>
              )
            })}
        </IonList>

        <IonCard>
          <LineChart />
        </IonCard>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Report</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonModal isOpen={isOpen} trigger="open-dashboard" >
          <IonToolbar>

            <IonButtons slot="end">
              <IonButton onClick={() => { setLoader(false); setIsOpen(false) }}>Close</IonButton>
            </IonButtons>
          </IonToolbar>

          <IonCard>
            <IonItem>
              <LineDos />
              <BarCharts />
              <RadarCharts />
            </IonItem>
          </IonCard>
          <IonList>
            <IonGrid>
              {!loader && (<>
                {exams?.map((exam: any) => (
                  <>
                    <IonLabel>{moment(exam.therapy.created_at).format("D-M-Y")} </IonLabel>
                    <IonItem>
                      <IonLabel>{exam.therapy.name}</IonLabel>

                      <IonButton color="danger" slot='end'>50% completada</IonButton>

                    </IonItem>
                  </>
                ))}
              </>)}
            </IonGrid>
          </IonList>


        </IonModal>

      </IonContent>

    </IonPage>
  );
};

export default ReportesdeResultado;
