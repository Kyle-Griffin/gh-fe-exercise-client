import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/header'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
	// require('../mocks')
	require('mocks')
}

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Header />
			<Component {...pageProps} />
		</>
	)
}
