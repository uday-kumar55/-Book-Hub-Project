import {BrowserRouter, Routes, Route} from 'react-router-dom'

import LoginPage from './components/LoginPage'
import HomeRoute from './components/HomeRoute'
import BookShelvesRoute from './components/BookShelvesRoute'
import BookItemDetails from './components/BookItemDetails'
import NotFound from './components/PageNotFoundComponent'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomeRoute />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bookshelves"
        element={
          <ProtectedRoute>
            <BookShelvesRoute />
          </ProtectedRoute>
        }
      />

      <Route
        path="/books/:id"
        element={
          <ProtectedRoute>
            <BookItemDetails />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)

export default App