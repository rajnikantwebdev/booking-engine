import { useState } from "react";
import SearchComponent from "./components/SearchComponent";
import Card from "./components/Card";
import RoomsPage from "./components/RoomsPage";

function App() {
  return (
    <section className="w-full min-h-screen px-4 py-6">
      <RoomsPage />
    </section>
  );
}

export default App;
