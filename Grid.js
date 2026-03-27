export default function Grid(G) {

	function init(graph){
		const N = graph.G[0].length;
		for(let i = 0; i < N; i++){
			for(let j = 0; j < N; j++){
				if(graph.G[i][j]===2){
					const node = Math.floor(i * N) + j;
					graph.S.add(node);
				}
			}
		}
		return graph;
	}

	const coords = (G, s) => {
		const N = G[0].length;
  		const r = Math.floor(s/N);
  		const c = s % N;
  		return { r, c };
	}
	const nodeNo = (G, r, c) => r * G[0].length + c;
	const north = (G, s) => {
  		const { r, c } = coords(G, s);
  		if(r <= 0) return { v:0, node: -1};
  		return { v: G[r-1][c], node: nodeNo(G, r-1, c) };
	}
	const south = (G, s) => {
  		const { r, c } = coords(G, s);
  		if(r >= G.length-1) return { v:0, node: -1};
  		return { v: G[r+1][c], node: nodeNo(G, r+1, c) };
	}
	const east = (G, s) => {
  		const { r, c } = coords(G, s);
  		if(c >= G[0].length-1) return { v:0, node: -1};
  		return { v: G[r][c+1], node: nodeNo(G, r, c+1) };
	}
	const west = (G, s) => {
  		const { r, c } = coords(G, s);
  		if(c <= 0) return { v:0, node: -1};
  		return { v: G[r][c-1], node: nodeNo(G, r, c-1) };
	}
	function process(grid){
  		const M = grid.G[0].length;
  		let changed = false;
		//console.log(G, S);
		let T = new Set();

		grid.S.forEach(s => {
			const N = north(grid.G, s);
			const S = south(grid.G, s);
			const E = east(grid.G, s);
			const W = west(grid.G, s);
			
			console.log(N, S, E, W);

			if(N.v === 1){
				T.add(N.node);
				const coord = coords(grid.G, N.node);
				grid.G[coord.r][coord.c] = 2;
				changed = true;
			}
			if(S.v === 1){
				T.add(S.node);
				const coord = coords(grid.G, S.node);
				grid.G[coord.r][coord.c] = 2;
				changed = true;
			}
			if(E.v === 1){
				T.add(E.node);
				const coord = coords(grid.G, E.node);
				grid.G[coord.r][coord.c] = 2;
				changed = true;
			}
			if(W.v === 1){
				T.add(W.node);
				const coord = coords(grid.G, W.node);
				grid.G[coord.r][coord.c] = 2;
				changed = true;
			}
		});
		return { G: grid.G, S: changed ? T : grid.S };
	}


	return { process, init }
}