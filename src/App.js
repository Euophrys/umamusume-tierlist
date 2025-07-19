import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JP from './JP';
import Global from './global/Global';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JP />} />
        <Route path="/uma-tiers" element={<JP />} />
        <Route path="/uma-tiers/global" element={<Global />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;