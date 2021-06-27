import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import TaskCard from './components/TaskCard';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const results = await axios.get('http://localhost:4000/task');
      console.log(`results ${JSON.stringify(results)}`);
      setUsers(results.data.results);

    })();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="columns">
        <section className="section column is-full">
          <div className="main_container">
            <div className="columns">
              <div className="column is-three-fifths is-offset-one-fifth">
                {users.map((user) => {
                  return <TaskCard user={user} key={user.id} />
                })}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div >
  );
}

export default App;
