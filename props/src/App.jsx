import Student from './Student.jsx'
function App() {
  return (
    <>
    <Student name="Bill" age={30} isStudent={true}/>
    <Student name="Fuch" age={35} isStudent={false}/>
    <Student name="Cuant" age={60} isStudent={false}/>
    <Student name="Bittc" age={27} isStudent={true}/>
    <Student/>
    </>
  )
}

export default App
