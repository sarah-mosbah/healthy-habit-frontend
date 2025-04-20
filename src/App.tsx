import HabitForm from "./components/habit-form/habit-form.component";
import MotivationBox from "./components/motivation-box/motivation-box.component";
import './index.scss'

function App() {
  return (
    <div className="container">
      <div className="logo-wrapper">
        <img src="/healthy-habit-logo.png" alt="Healthy Habit Logo" className="logo" />
     
      </div>
      <HabitForm />
      <hr />

      <MotivationBox />
    </div>
  );
}

export default App;