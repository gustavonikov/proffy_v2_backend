const subjects = [
    'Artes',
    'Biologia',
    'Ciências',
    'Educação Física',
    'Física',
    'Geografia',
    'História',
    'Matemática',
    'Português',
    'Química',
    'Programação',
];

const weekdays = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
];

function getSubject(subjectNumber) {
    const subjectPosition = +subjectNumber - 1; // sem + tava dando bom
    return subjects[subjectPosition];
}

function convertHoursToMinutes(time: string) {
    const [hour, min] = time.split(':').map(Number);
    return (hour * 60) + min;
}

export default convertHoursToMinutes;
