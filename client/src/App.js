import "./App.css";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { Route, Routes } from "react-router-dom";
import { UserDetails } from "./components/userDetails";
import { AddPost } from "./components/AddPost";
import { PostDetails } from "./components/PostDetails";
import { Analytics } from "./components/Analytics";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<AddPost />} />
        <Route path="/users" element={<Home />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </div>
  );
}

export default App;
