import "./gridMaker.css";

export default function GridMaker({grid}) {

	return (
		<>
		{grid.map((row, i) => (
			<div key={i}>
				<span>|</span>
				{row.map((cell, j) => (					
					<>
						<span className={'grid-maker ' + (cell === 2 ? 'rotten' : (cell === 1 ? 'good' : 'empty'))} key={j}>{cell}</span>
						<span>|</span>
					</>
					)
				)}
			</div>)
		)}
		</>
	)
}