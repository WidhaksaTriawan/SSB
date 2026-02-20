import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SSB from "./pages/SSB";
import Siswa from "./pages/Siswa";
import Jadwal from "./pages/Jadwal";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* Private Dashboard Area */}
        <Route
          path="/*"
          element={
            <div className="flex min-h-screen">
              <Sidebar />

              <main className="flex-1 bg-gray-100 p-6">
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="ssb" element={<SSB />} />
                  <Route path="siswa" element={<Siswa />} />
                  <Route path="jadwal" element={<Jadwal />} />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
