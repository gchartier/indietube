import React from "react";
import "./App.css";
import "./components/Header";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import About from "./components/About";

function App() {
    return (
        <div className="App">
            <Header />
            <About />
            <MainContent />
            <Footer />
        </div>
    );
}

export default App;
