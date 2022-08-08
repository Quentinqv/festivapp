/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <meta name="author" content="VITOUX Quentin • quentin-vitoux.fr" />

        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
        <meta name='application-name' content="Festiv'App" />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content="Festiv'App" />
        <meta name='description' content="Festiv'App, partagez vos souvenirs." />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-config' content='/icons/browserconfig.xml' />
        <meta name='msapplication-TileColor' content='#1D1443' />
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name='theme-color' content='#ffffff' />

        <link rel='apple-touch-icon' href='/icons/touch-icon-iphone.png' />
        <link rel='apple-touch-icon' sizes='152x152' href='/icons/touch-icon-ipad.png' />
        <link rel='apple-touch-icon' sizes='180x180' href='/icons/touch-icon-iphone-retina.png' />
        <link rel='apple-touch-icon' sizes='167x167' href='/icons/touch-icon-ipad-retina.png' />

        <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#5bbad5' />
        <link rel='shortcut icon' href='/favicon.ico' />
            
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:url' content='https://festivapp.quentin-vitoux.fr' />
        <meta name='twitter:title' content="Festiv'App" />
        <meta name='twitter:description' content="Festiv'App, partagez vos souvenirs." />
        <meta name='twitter:image' content='https://festivapp.quentin-vitoux.fr/icons/android-chrome-192x192.png' />
        <meta name='twitter:creator' content='@Festivapp' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content="Festiv'App" />
        <meta property='og:description' content="Festiv'App, partagez vos souvenirs." />
        <meta property='og:site_name' content="Festiv'App" />
        <meta property='og:url' content='https://festivapp.quentin-vitoux.fr' />
        <meta property='og:image' content='https://festivapp.quentin-vitoux.fr/icons/apple-touch-icon.png' />

        <title>Festiv'app</title>
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <ToastContainer />
        <Navbar />
      </SessionProvider>
    </>
  )
}

export default MyApp
