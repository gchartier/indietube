import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MainContent from "./components/main-content/MainContent";

function App() {
    return (
        <div className="App">
            <Header />
            <MainContent />
            <Footer />
        </div>
    );
}

export default App;
