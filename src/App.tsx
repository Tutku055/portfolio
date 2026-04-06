import React from "react";
import {
  PillNavbar,
  HomeEntrance,
  AboutMe,
  Skills,
  Projects,
  Contact,
  Footer,
} from "./components";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app-shell">
      <PillNavbar />
      <HomeEntrance />
      <AboutMe />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
