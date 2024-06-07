<<<<<<< HEAD
import { useState } from "react";

const initialItems = [
	{ id: 1, description: "Passports", quantity: 2, packed: true },
	{ id: 2, description: "Socks", quantity: 12, packed: false },
	{ id: 3, description: "Socks", quantity: 12, packed: false },
];

export default function App() {
	return (
		<div className="app">
			<Logo />
			<Form />
			<PackingList />
			<Stats />
		</div>
	);
}

function Logo() {
	return <h1>🌴Far Away👜</h1>;
}
function Form() {
	const [description, setdesc] = useState("");
	const [quantity, setquant] = useState(5);

	function handleSubmit(e) {
		e.preventDefault();
		if (!description) return;
		const newItem = { description, quantity, packed: true, id: Date.now() };
		setdesc("");
		setquant(1);
	}

	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<h3>What do you nedd for your 😊 trip?</h3>
			<select value={quantity} onChange={(e) => setquant(+e.target.value)}>
				{Array.from({ length: 20 }, (x, i) => i + 1).map((num) => (
					<option value={num} key={num}>
						{num}
					</option>
				))}
			</select>
			<input
				type="text "
				placeholder="Item..."
				value={description}
				onChange={(e) => setdesc(e.target.value)}
			/>
			<button>Add</button>
		</form>
	);
}

function PackingList() {
	return (
		<div className="list">
			<ul className="list">
				{initialItems.map((item) => (
					<Item item={item} key={item.id} />
				))}
			</ul>
		</div>
	);
}
function Item({ item }) {
	return (
		<li>
			<span style={item.packed ? { textDecoration: "line-through" } : {}}>
				{item.quantity}
				{item.description}
				<button>❌</button>
			</span>
		</li>
	);
}

function Stats() {
	return (
		<footer className="stats">
			<em>You have X items on your list,and you have already oacked x(x%)</em>
		</footer>
	);
}
=======
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
>>>>>>> 24fe82dfd58135b9e44b7ca2b173e09012b0948b
