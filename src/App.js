import logo from './logo.svg';

import AllMovies from './components/AllMovies';
import AllSeries from './components/AllSeries';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './App.css';

function App() {
  return (
//     <div className="App">
// {/* <AllMovies/> */}
// <AllSeries/>
    
//     </div>

<Tabs>
<TabList>
  <Tab>Movies</Tab>
  <Tab >Series</Tab>
 
</TabList>

<TabPanel>
  <AllMovies/>
</TabPanel>
<TabPanel>
<AllSeries/>
</TabPanel>

</Tabs>
);

}

export default App;
