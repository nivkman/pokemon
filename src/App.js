import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Layout from './HLC/Layout';
import Cards from './components/Cards';
import Pokemon from './components/Pokemon';

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Cards showFavorites={false} />} />
          <Route path="/favorites" element={<Cards showFavorites={true} />} />
          <Route path="/:id" element={<Pokemon />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
