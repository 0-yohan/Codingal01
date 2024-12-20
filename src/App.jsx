import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Layout from './Components/Layout'
import Home from './Components/Home'
import Posts from './Components/Posts'
import './App.css'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

            <Route path="/posts" element={<Posts />} />
            <Route path="/passengers" element={<Posts />} />
          
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App

