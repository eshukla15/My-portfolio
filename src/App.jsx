import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import  Resume  from "./pages/Resume";
import  Portfolio  from "./pages/Portfolio";
import  {NotFound}  from "./pages/NotFound";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* "/" → Landing page with 2 buttons */}
        <Route index element={<Landing />} />

        {/* "/resume" → resume page */}
<Route path="/resume" element={<Resume />} />

        {/* "/portfolio" → portfolio site */}
        <Route path="/portfolio" element={<Portfolio />} />

        {/* Not found route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;