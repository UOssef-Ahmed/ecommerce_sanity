import Head from 'next/head';
import Link from 'next/link'
import React from 'react'
import { urlFor } from '../lip/client'
import Footer from './Footer'
import NavBar from './NavBar'

function Layout({children}) {
  return (
    <div className="layout">
      <Head>
        <title>youssef ahmed</title>
      </Head>
      <header>
        <NavBar />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
