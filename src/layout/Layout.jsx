import React from 'react'
import Header from './header/Header'
import Main from './Main'
import Footer from './footer/Footer.jsx'

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <Main>{children}</Main>
            <Footer />
        </>
    )
}
