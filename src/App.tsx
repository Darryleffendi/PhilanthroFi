import { router } from '@lib/routes/route';
import './App.css';
import {  RouterProvider} from "react-router-dom";

function App() {

  return (
    <div >
      {/* nanti ini context aja masukingnya */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
