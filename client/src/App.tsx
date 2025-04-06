import { Suspense } from "react";
import { Loader } from "./components/ui/loader";
import AppRoutes from "./components/app.routes";

function App() {
  return (
    <Suspense fallback={<Loader overlay={true} className="h-10 w-10" />}>
      <AppRoutes />
    </Suspense>
  );
}

export default App;
