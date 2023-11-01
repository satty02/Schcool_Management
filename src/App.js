import MarksForm from "./components/marks/MarksForm";
import MarksList from "./components/marks/MarksList";
import StudentForm from "./components/students/StudentForm";
import StudentList from "./components/students/StudentList";
import TeacherForm from "./components/teachers/TeacherForm";
import TeacherList from "./components/teachers/TeacherList";

function App() {
  return (
    <>
      <div className="text-center h2 shadow-sm bg-gradient bg-secondary text-light   p-2">School Management</div>
      <div className="App">
        <div className="students">
          <StudentForm/>
          <StudentList/>
        </div>
        <div className="students">
          <TeacherForm/>
          <TeacherList/>
        </div>
        <div>
          <MarksForm/>
          <MarksList/>
        </div>
      </div>
    </>
  );
}

export default App;
