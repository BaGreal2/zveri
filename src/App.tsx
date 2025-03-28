function App() {
	return (
		<>
			<div className="flex h-screen w-screen flex-col">
				<div className="h-1/2 bg-blue-500 w-full" />
				<div className="h-1/2 bg-yellow-400 w-full" />
				<a
					href="https://www.youtube.com/watch?v=6lYkQ0O5oSM"
					target="_blank"
					className="text-white font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl py-3 px-5 backdrop-blur-md rounded-md shadow-lg active:shadow-xs active:-translate-x-[49%] active:-translate-y-[49%] transition-all duration-150 cursor-pointer"
				>
					SLAVA UKRAINI
				</a>
				<button>Click</button>
			</div>
		</>
	);
}

export default App;
