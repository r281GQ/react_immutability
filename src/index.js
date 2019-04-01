import React, { useReducer } from "react";
import ReactDOM from "react-dom";

function GrandChild(props) {
  return (
    <div>
      This is the grand child and it will not get updated
      <div>{props.number || 0}</div>
    </div>
  );
}

function Child(props) {
  return (
    <>
      This is the child element with the number coming from the parent :{" "}
      {props.parentState.number}
      <div>
        <button
          onClick={() => {
            props.parentState.number = props.parentState.number + 1;
            console.log(props);
          }}
        >
          clicking on me will increment the number using reference and
          mutability
        </button>
      </div>
      <GrandChild number={props.parentState.number} />
    </>
  );
}

function App() {
  const [state] = useReducer(
    (state, action) => {
      if (action.type === "inc") {
        return { ...state, number: action.payload + state.number };
      }

      if (action.type === "dec") {
        return {
          ...state,
          number: state.number - action.payload
        };
      }

      return state;
    },
    { number: 5 }
  );

  return (
    <div>
      The current number in state when it got rendered was : {state.number}
      <div style={{ marginTop: 30 }}>
        <button onClick={() => console.log(state)}>
          The underlying state is updated but not reflected in the app
        </button>
        <div style={{ marginTop: 30 }}>
          <Child parentState={state} />
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
