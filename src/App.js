import React, { useState } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MainContent from "./components/main-content/MainContent";
import { GlobalStyles, StyledApp, lightTheme, darkTheme } from "./globalStyles";
import { ThemeProvider } from "styled-components";

export default function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const [submitSearch, setSubmitSearch] = useState(false);
    const [nonIndieCount, setNonIndieCount] = useState(0);
    const [styleTheme, setStyleTheme] = useState("light");

    return (
        <ThemeProvider theme={styleTheme === "light" ? lightTheme : darkTheme}>
            <StyledApp>
                <Header
                    searchQuery={searchQuery}
                    handleSearchQueryChange={setSearchQuery}
                    handleSearchQuerySubmit={() => {
                        setSubmitSearch(true);
                    }}
                    nonIndieCount={nonIndieCount}
                    handleThemeChange={setStyleTheme}
                />
                <MainContent
                    setNonIndieCount={setNonIndieCount}
                    nonIndieCount={nonIndieCount}
                    submitSearch={submitSearch}
                    setSubmitSearch={setSubmitSearch}
                    searchQuery={searchQuery}
                />
                <Footer />
                <GlobalStyles />
            </StyledApp>
        </ThemeProvider>
    );
}
