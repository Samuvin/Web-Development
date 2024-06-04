import { useEffect, useState } from "react";

export default function App() {
	const [advice, setAdvice] = useState("");
	const [count, setcount] = useState(0);

	async function getAdvice() {
		const res = await fetch("https://api.adviceslip.com/advice");
		const data = await res.json();
		console.log(data.slip.advice);
		setAdvice(data.slip.advice);
		setcount((c) => c + 1);
	}

	useEffect(function () {
		getAdvice();
	}, []);

	return (
		<div>
			<h1>{advice}</h1>
			<button onClick={getAdvice}>Click</button>
			<Message count={count} />
		</div>
	);
}

function Message(props) {
	return (
		<p>
			You Have read<strong> {props.count} piece of advice</strong>
		</p>
	);
}
