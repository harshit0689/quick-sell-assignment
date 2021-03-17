import './App.css';

import { testData } from './constants/test-data';
import Products from './components/products/Products';

function App() {
  return (
    <div className="App">
      <Products {...testData}/>
    </div>
  );
}

export default App;
