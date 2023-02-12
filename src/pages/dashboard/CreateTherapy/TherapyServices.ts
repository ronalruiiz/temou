export function getQuestion() {
    if (!localStorage['questions']) {
        localStorage['questions'] = '[]';
    }

    let question = localStorage['questions'];
    question = JSON.parse(question);

    return question;

}

export function removeQuestion(id: String) {
    let questions = getQuestion();

    let indice = questions.findIndex((question: any) => question.id == id)
    questions.splice(indice, 1)

    localStorage['questions'] = JSON.stringify(questions);
}

export function saveQuestion(question: any) {
    let questions = getQuestion();
    questions.push(question)
    localStorage['questions'] = JSON.stringify(questions);
}

export function updateQuestion(id,question){
    let questions = getQuestion();

    let index = questions.findIndex((question: any) => question.id == id)
    questions[index] = question

    localStorage['questions'] = JSON.stringify(questions);
}