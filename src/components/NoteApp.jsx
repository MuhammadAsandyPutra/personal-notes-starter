import React, { Component } from "react";
import NoteHeader from "./NoteHeader";
import Navigation from "./Navigation";
import HomePage from "../pages/HomePage";
import AddNote from "../pages/AddNote";
import DetailPage from "../pages/DetailPage";
import { Routes, Route} from "react-router-dom"; 
import ProblemPage from "../pages/ProblemPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import { LocaleProvider } from "../context/LocaleContext";
import { getUserLogged, putAccessToken } from "../utils/network-data";

class NoteApp extends Component {
    constructor(props) {
        super(props);

        const initialLocale = localStorage.getItem('locale') || 'id';
        const initialTheme = localStorage.getItem('theme') || 'light';

        this.state = {
            authedUser: null,
            initializing: true,
            localeContext: {
                locale: initialLocale,
                theme: initialTheme,
                toggleTheme: () => {
                    this.setState(prevState => ({
                        localeContext: {
                            ...prevState.localeContext,
                            theme: prevState.localeContext.theme === 'light' ? 'dark' : 'light'
                        }
                    }), () => {
                       
                        document.documentElement.setAttribute('data-theme', this.state.localeContext.theme);
                        localStorage.setItem('theme', this.state.localeContext.theme);
                    });
                },
                toggleLocale: () => {
                    this.setState(prevState => ({
                        localeContext: {
                            ...prevState.localeContext,
                            locale: prevState.localeContext.locale === 'id' ? 'en' : 'id'
                        }
                    }), () => {
                        localStorage.setItem('locale', this.state.localeContext.locale);
                    });
                }
            }
        };

        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    async componentDidMount() {
        const { localeContext } = this.state;
        document.documentElement.setAttribute('data-theme', localeContext.theme);

        try {
            const { data } = await getUserLogged();
            this.setState({ authedUser: data, initializing: false });
        } catch (error) {
            console.error("Error fetching user:", error);
            this.setState({ initializing: false });
        }
    }

    componentDidUpdate(prevState) {
        const { theme } = this.state.localeContext;
        if (prevState.localeContext.theme !== theme) {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }

    onLogout() {
        this.setState({ authedUser: null });
        putAccessToken('');
    }

    async onLoginSuccess({ accessToken }) {
        putAccessToken(accessToken);
        try {
            const { data } = await getUserLogged();
            this.setState({ authedUser: data });
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }

    render() {
        const { authedUser, initializing, localeContext } = this.state;

        if (initializing) {
            return null;
        }

        return (
            <LocaleProvider value={localeContext}>
                <div className="app-container">
                    <NoteHeader name={authedUser && authedUser.name} />
                    {authedUser ? (
                        <header className="note-app__header">
                            <Navigation logout={this.onLogout} name={authedUser.name} />
                        </header>
                    ) : null}
                    <div className="note-app__body">
                        <main>
                            <Routes>
                                {!authedUser && <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />}
                                {!authedUser && <Route path="/register" element={<RegisterPage />} />}
                                {authedUser && <Route path="/" element={<HomePage />} />}
                                {authedUser && <Route path="/add" element={<AddNote />} />}
                                {authedUser && <Route path="/notes/:id" element={<DetailPage />} />}
                                <Route path="*" element={<ProblemPage />} />
                            </Routes>
                        </main>
                    </div>
                </div>
            </LocaleProvider>
        );
    }
}

export default NoteApp;
