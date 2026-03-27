import { useState, useEffect, useCallback } from 'react'
import GridMaker from './gridmaker.jsx';
import Grid from './../services/Grid.js';

export default function GridSurround ({ newGrid }) {

  const [grid, setGrid] = useState({ G: newGrid, S: new Set() })
  const [secs, setSecs] = useState(0);
  const [cx, setCx] = useState(true);
  const [initGrid, setInitGrid] = useState(true);

  const gridProcess = useCallback((grid) => Grid().process(grid), [grid]);
  const gridInit = useCallback((grid) => Grid().init(grid), []);

  useEffect(() => {
    gridInit(grid);
  })


  useEffect(() => {    
    
    const id = setInterval(() => {
      setSecs(secs+1);
      
      setGrid(gridProcess(grid));
      console.log(secs, grid);
    }, 1000)
    return () => clearInterval(id);
  },[secs]);

  return (
    <>
      <div>
        <GridMaker grid={grid.G} />
      </div>
      <div>{secs}</div>
    </>
  )
}