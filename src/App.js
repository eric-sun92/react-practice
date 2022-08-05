import { useState, useReducer, useEffect } from "react";
import axios from "axios";

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "decrement":
//       return { count: state.count - 1 };
//     case "increment":
//       return { count: state.count + 1 };
//   }
// };

function App() {
  const [count, setCount] = useState(0);
  // const [jsonData, setJsonData] = useState("");
  const [userInfos, setUserInfos] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(
    () => getNextPerson,

    []
  );

  // const [state, dispatch] = useReducer(reducer, { count: 0 });

  const decrement = () => {
    setCount((previous) => {
      return previous - 1;
    });
  };

  const increment = () => {
    setCount((previous) => {
      return previous + 1;
    });
  };

  const getNextPerson = () => {
    console.log("here");
    axios
      .get(`https://randomuser.me/api?page=${page}`)
      .then((res) => {
        // console.log(res.data.results[0]);
        // setJsonData(JSON.stringify(res.data, null, 1));

        setUserInfos([...userInfos, ...res.data.results]);
        setPage(res.data.info.page + 1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="App">
        <button onClick={decrement}>Down</button>
        <div>{count}</div>
        <button onClick={increment}>Up</button>
      </div>
      <br></br>
      {/* <div>{jsonData}</div> */}
      <button onClick={getNextPerson}>Get More People</button>
      <div>
        {userInfos.map((userInfo, index) => (
          <div key={index}>
            <p>{userInfo.name.first}</p>
            <img src={userInfo.picture.thumbnail}></img>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
