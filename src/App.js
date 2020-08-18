import React, { useState } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MainContent from "./components/main-content/MainContent";
import About from "./components/about/About";
import Filter from "./components/filter/Filter";
import { GlobalStyles, StyledApp, lightTheme, darkTheme } from "./globalStyles";
import { ThemeProvider } from "styled-components";
import { Route, Switch, Redirect } from "react-router-dom";

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
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={() => (
                            <MainContent
                                setNonIndieCount={setNonIndieCount}
                                nonIndieCount={nonIndieCount}
                                submitSearch={submitSearch}
                                setSubmitSearch={setSubmitSearch}
                                searchQuery={searchQuery}
                            />
                        )}
                    />
                    <Route path="/About" component={About} />
                    <Route path="/Filter" component={Filter} />
                    <Redirect to="/" />
                </Switch>
                <Footer />
                <GlobalStyles />
            </StyledApp>
        </ThemeProvider>
    );
}
