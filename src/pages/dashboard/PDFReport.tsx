import { PDFViewer } from '@react-pdf/renderer';
import { useState, useEffect } from 'react';
import axios from '../../helpers/axiosInterceptor';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: "20px"
  },
  text: {
    margin: 5,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  table: {
    borderWidth: 1,
    marginHorizontal: 20,
    flexFlow: 1
  },
  tableRow: {
    flexDirection: "row"
  },
  tableCellHeader: {
    margin: 2,
    fontSize: 10
  },
  headerBg: {
    borderStyle: "solid",
    borderWidth: 1
  },
  tableCell: {
    margin: 2,
    fontSize: 12
  }
});

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});


const ResultQuestion = ({ exam }) => {

  const results: any = []

  const questions = JSON.parse(exam.questions)

  questions.forEach((question,index) => {
  
    if (question.type == "single") {
      if (question.response != null || question.response != undefined) {
        results.push({"question":index,"response":[question.options[question.response]]})
      }
    }
    if (question.type == "multiple") {
      const questionResponse:any = []
      if (question.response != null){ 
        question.response.forEach(element => {
          if (element != null || element != undefined) {
            questionResponse.push(question.options[element])
          }
        });
      }
      results.push({"question":index,"response":questionResponse})
    }
  })
  return (
    <>
    {results.map(result => (<Text style={styles.text}>- Pregunta {result.question} : {result.response}</Text>))}
    </>
  )
}


const ReportResults = (props) => {
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.title}>
          Reporte de Terapias
        </Text>
        {props.data.map((therapy) => (
          <>
            <Text style={styles.title}>
              {therapy.name}
            </Text>
            <Text style={styles.text} > Descripción: {therapy.description}</Text>
            <Text style={styles.text} > Tipo: {therapy.type}</Text>
            <Text style={styles.text}> Usuarios:</Text>

            {therapy.exams.map((exam) => (
              <>
                <Text style={styles.text}> - {exam.user.email}</Text>
                <Text style={styles.text}>  Respuestas de Usuarios: </Text>
                <ResultQuestion exam={exam} />
              </>
            ))}

          </>
        ))}
      </Page>
    </Document>
  )
};

const PDFReport = () => {
  const [loader, setLoader] = useState(false)
  const [therapies, setTherapies] = useState<[]>()

  useEffect(() => {
    async function usersExam() {
      const response = await axios.get("/all-users")
      setTherapies(response.data)
      setLoader(true)
    }
    usersExam()
  }, []);

  return (
    <>
      {loader == true && (
        <PDFViewer style={{ width: "100%", height: "100%" }}>
          <ReportResults data={therapies} />
        </PDFViewer>
      )}

    </>
  );
}
export default PDFReport