import { useEffect } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { KP_API } from './constants';
import { useFetch } from './hooks/fetch.hook';

function App() {
  const {response} = useFetch(KP_API + '/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1', {headers: {'X-API-KEY' : process.env.REACT_APP_API_KP, 'Content-Type' : 'application/json'}})
  useEffect(() => {
    console.log(response);
  }, [response])
  return (
    <div>
      <Navbar />
    </div>
  );
}

export default App;
