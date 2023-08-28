import {useEffect, useState} from "react";

/* FIXME: 1. 간단한 TODO 제작
function App() {
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const onChange = (event) => {
        setTodo(event.target.value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        if (todo === "") return;
        setTodoList(currentArray => [todo, ...currentArray]);
        setTodo("");
    }

    console.log(todoList);

    return (
        <div>
            <h1>My Todo ({todoList.length})</h1>
            <form onSubmit={onSubmit}>
                <input value={todo} onChange={onChange} type="text" placeholder="Write your todo"/>
                <button>Add To Do</button>
            </form>
            <hr/>
            <ul>
                {createTodoList(todoList)}
            </ul>

        </div>
    );
}

function createTodoList(list) {
    return list.map((item, index) => <li key={index}>{item}</li>)
}
*/

function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [dollar, setDollar] = useState(0);
    const [index, setIndex] = useState("0");
    const [convertedCoin, setConvertedCoin] = useState(0);
    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
            .then((response) => response.json())
            .then((json) => {
                setCoins(json);
                setLoading(false);
            });
    }, []);

    const onChange = (event) => {
        setDollar(event.target.value);
        setConvertedCoin(event.target.value / Math.fround(coins[index].quotes.USD.ath_price).toFixed(2))
    }

    const onSelect = (event) => {
        console.log(event)
        setIndex(event.target.value);
    }
    return (
        <div>
            <h1>The Coins! {loading ? null : coins.length}</h1>
            {loading ? <strong>Loading...</strong> : null}
            <hr />
            <select value={index} onChange={onSelect} hidden={loading}>
                {coins.map((coin, value) => <option value={value}>{coin.name} ({coin.symbol}):
                    ${Math.fround(coin.quotes.USD.ath_price).toFixed(2)}</option>)}
            </select>
            <div hidden={loading}>
                <label htmlFor="Your USD">$
                    <input id="dollar" type="number" value={dollar} onChange={onChange} placeholder="Write Your $USD"/>
                </label>
                <h3>Converted Coin: {convertedCoin}</h3>
            </div>

        </div>
    );
}

export default App;
