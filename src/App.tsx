import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, getRandom, TGetRandom } from './store/Stock.store';
import { RootState } from './store';
import './App.css';

function App() {
  const dispatch = useDispatch()
  const stock = useSelector((state: RootState) => state.stock)
  const vpar: TGetRandom = { limit: 50 }

  return (
    <div className="App">
      <header className="App-header">
        <h1>{ stock.counter }</h1>
        <button onClick={() => dispatch(increment())}>Somar</button>
        <button onClick={() => dispatch(decrement())}>Subtrair</button>
        <button onClick={() => dispatch(getRandom(vpar) as any)}>
          Aleatório
        </button>
      </header>
    </div>
  );
}

export default App;
