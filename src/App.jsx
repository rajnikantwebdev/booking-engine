import RoomsPage from "./components/RoomsPage";
import { createBrowserRouter } from "react-router-dom";
import BookingDonePage from "./components/BookingDonePage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/booking/done",
    element: <BookingDonePage />,
  },
]);

function App() {
  return (
    <section className="w-full min-h-screen px-4 py-6">
      <RoomsPage />
    </section>
  );
}

export default App;
