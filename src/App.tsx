import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './App.css'

import City from './components/city'
import Layout from './components/layout'
import Dashboard from './components/dashboard'
import { ThemeProvider } from './components/theme-provider'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <ThemeProvider defaultTheme="light">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path='/city/:cityName' element={<City />} />
          </Routes>
        </Layout>
      </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
