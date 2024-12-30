import './App.css';
import {useState, useRef} from 'react';

function App() {

    const [text, setText] = useState([]);
    const InputName = useRef(null);
    const InputText = useRef(null);
    const [msgInfo, setMsgInfo] = useState({});
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState("");

    function Send(){

        if (InputName.current.value === "" && InputText.current.value === ""){
            return;
        }

        if (progress === 100){
            setError("Mail is full, your message was not delivered")
            return;
        } else {
            setError("");
        }

        const currentTime = new Date();
        const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const newText = {
            name: InputName.current.value,
            text: InputText.current.value,
            time: formattedTime,
            seen: false
        };

        setText((prevText) => [...prevText, newText]);

        InputName.current.value = null;
        InputText.current.value = null;

        setProgress(progress + 20);

        console.log(newText);
        console.log(text)
    }

    function openMsg(index){
        setMsgInfo(text[index])
    }

    function seenMsg(){
        msgInfo.seen = true
        setText((prevText) =>
            prevText.map((item) =>
                item === msgInfo ? { ...item, seen: true } : item
            )
        );
        setProgress(progress - 20);
    }


  return (
    <div className="App">
      <div className="container">

          <div className="title">
              <h1>Letters to Santa 🎅🏼</h1>
          </div>

          <div className="sections">
              <div className="boxes f-col">
                  <div>
                      <h4>Name 🎄</h4>
                      <input className="name" type="text" placeholder="Write your name" ref={InputName}/>
                  </div>
                  <div>
                      <h4>Message to Santa ⛄</h4>
                      <textarea className="msg" placeholder="Dear Santa..." ref={InputText}></textarea>
                  </div>
                  <div className="sendError">
                      <button onClick={Send} className="send">Send ❄</button>
                      <div className="error">
                          <p>{error}</p>
                      </div>
                  </div>
              </div>

              <div className="boxes middle">
                  <div className="bar">
                      <div className="progress"
                           style={{
                               height : `${progress}%`,
                               backgroundColor: progress >= 50 ? "#f36767" : "green"}}></div>
                  </div>
                  <div className="allMsg">
                      {text.map((item, index) => (
                          <div className="newMsg" key={index}>
                              <div className="info">
                                  <p>From: {item.name}</p>
                                  <p>Time: {item.time}</p>
                              </div>
                              <div className="svg">
                                  <svg onClick={() => openMsg(index)} xmlns="http://www.w3.org/2000/svg" width="30"
                                       height="30" viewBox="0 0 17 16">
                                      <g fill="none" fill-rule="evenodd">
                                          <path fill={item.seen ? "rgba(203, 66, 66, 0.88)" : "currentColor"}
                                                d="M11.969 3.985L9 1.032L6.031 3.985h1.985V6.97h1.937V3.985z"/>
                                          <path
                                              d="M16.062 7.094v-1.37l-7.048 5.62l-7.076-5.532l.029 1.282l3.07 2.599l-3.189 4.353h1.246l2.862-3.477l3.058 2.619l3.008-2.545l2.884 3.403l1.264-.015l-3.124-4.338z"/>
                                          <path fill={item.seen ? "rgba(203, 66, 66, 0.88)" : "currentColor"}
                                                d="M16.304 5.059h-5.242v3.004H6.959V5.059H1.701a.65.65 0 0 0-.648.648v8.617a.65.65 0 0 0 .648.648h14.603a.65.65 0 0 0 .649-.648V5.707a.65.65 0 0 0-.649-.648m-1.398 8.987l-2.884-3.403l-3.009 2.545l-3.058-2.618l-2.862 3.477H1.847l3.189-4.353l-3.07-2.6l-.029-1.281l7.076 5.531l7.049-5.62v1.37l-3.017 2.6l3.124 4.338z"/>
                                      </g>
                                  </svg>
                              </div>
                          </div>
                      ))
                      }
                  </div>
              </div>

              <div className="boxes f-col f-center">
                  <div className="receive">
                      <h4>Name: {msgInfo.name}</h4>
                  </div>
                  <div className="receiveMsg">
                      <h4>Message:</h4>
                      <p> {msgInfo.text}</p>
                  </div>
                  <div>
                      <button onClick={seenMsg} className="send">Mark as seen ❄</button>
                      <div className="error"></div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}

export default App;
