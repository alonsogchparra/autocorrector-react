import "./App.css";
import { Autocorrector } from "./components/Autocorrector";
import logo from "./logo.svg";

export const App = () => {
  return (
    <div className="">
      <header className="App-header">
        <img src={logo} className="App App-logo" alt="logo" />
        <h1>Autocorrector (Tiny)</h1>
        <Autocorrector />
      </header>
    </div>
  );
};
