import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonModal, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { download } from 'ionicons/icons';
import LineChart from '../../charts/LineaChart';
import RadarCharts from '../../charts/RadarCharts';
import LineDos from '../../charts/LineDos';
import { useEffect, useState } from 'react';
import axios from '../../helpers/axiosInterceptor';
import moment from 'moment'
import './../../assets/scss/custom/pages/reports.scss'
import { Link } from 'react-router-dom';



const ReportesdeResultado: React.FC = () => {
  const [users, setUsers] = useState<[]>()
  const [search, setSearch] = useState("")
  const [therapies, setTherapies] = useState<[]>()

  const [exams, setExams] = useState([])
  const [loader, setLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [isOpen2, setIsOpen2] = useState(false);
  const [user, setUser] = useState<any>({})

  useEffect(() => {
    async function usersExam() {
      const response = await axios.get("/users-exams")
      setUsers(response.data)
      

    }
    async function usersAll() {
      const response = await axios.get("/all-users")
      setTherapies(response.data)

    }
    usersExam()
    usersExam()
    usersAll()
  }, []);

  const resultExam = (exam) => {
    const questions = JSON.parse(exam.questions).filter((question) => question.type == "single" || question.type == "multiple")
    let responses = 0
    questions.forEach(question => {
      
      if (question.response != null) {
        if (question.type == "single") {
          responses += 1
        }
        if (question.type == "multiple" && question.response.length > 0) {
          responses += 1
        }
      }
    })
    let result = (responses / questions.length) * 100
    return parseInt(result.toString())
  }

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
                <Link to={"/pdf-report"} color='primary' className="btn btn-primary" slot='end'><IonIcon icon={download} /> Generar Reporte</Link>
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
                    <IonButton onClick={() => { setUser(user); setIsOpen2(true) }} color="tertiary" slot='end'>
                      Informacion
                    </IonButton>
                    <IonButton onClick={() => { onResolveExams(user.id); setLoader(true); setIsOpen(true) }} color="success" slot='end'>
                      Dashboard
                    </IonButton>
                  </IonToolbar>
                </IonItem>
              )
            })}
        </IonList>
        {therapies && (
          <IonCard>
            <IonCardContent>
              <LineChart therapies={therapies} />
            </IonCardContent>
          </IonCard>
        )}
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Report</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonModal className='dashboard-modal' isOpen={isOpen} trigger="open-dashboard" >
          <IonToolbar>

            <IonButtons slot="end">
              <IonButton onClick={() => { setLoader(false); setIsOpen(false) }}>Close</IonButton>
            </IonButtons>
          </IonToolbar>

          <IonContent>
            <IonItem>
              <LineDos exams={exams} />
              <RadarCharts exams={exams} />
            </IonItem>

            <IonList>
              <IonGrid>
                {!loader && (<>
                  {exams?.map((exam: any) => (
                    <>
                      <IonLabel>{moment(exam.therapy.created_at).format("D-M-Y")} </IonLabel>
                      <IonItem>
                        <IonLabel>{exam.therapy.name}</IonLabel>

                        <IonButton color="primary" slot='end'>{resultExam(exam)}% completada</IonButton>

                      </IonItem>
                    </>
                  ))}
                </>)}
              </IonGrid>
            </IonList>
          </IonContent>

        </IonModal>

        {/* Information User */}
        <IonModal isOpen={isOpen2} trigger="open-dashboard" >
          <IonToolbar>
            <IonButtons slot="end">
              <IonButton onClick={() => { setIsOpen2(false); setUser(null) }}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
          <IonContent className="ion-padding">
            <IonItem>
              Nombre: {user?.name}
            </IonItem>
            <IonItem>
              Email: {user?.email}
            </IonItem>
            <IonItem>
              Fecha de Registro: {user?.created_at}
            </IonItem>
          </IonContent>
        </IonModal>
      </IonContent>

    </IonPage>
  );
};

export default ReportesdeResultado;
