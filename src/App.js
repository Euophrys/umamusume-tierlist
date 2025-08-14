import { HashRouter, Routes, Route } from 'react-router-dom';
import JP from './JP';
import Global from './global/Global';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<JP />} />
        <Route path="global" element={<Global />} />
      </Routes>
    </HashRouter>
  );
}

export default App;