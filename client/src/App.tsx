import { Suspense } from "react";
import { Loader } from "./components/ui/loader";
import AppRoutes from "./components/app.routes";
import { ActivityContextProvider } from "./context/activityContext";

function App() {
  return (
    <Suspense fallback={<Loader overlay={true} className="h-10 w-10" />}>
      <ActivityContextProvider>
        <AppRoutes />
      </ActivityContextProvider>
    </Suspense>
  );
}

export default App;
