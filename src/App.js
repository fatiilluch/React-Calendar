import './App.css';
import React, { useState } from "react";
import Modal from 'react-modal';
import Calendar from "./components/Calendar";

Modal.setAppElement('#root')

function App() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    return (
    <div className="App">
        <button onClick={() => setModalIsOpen(true)}> Open </button>
        <Modal
            style={
                {
                    overlay: {
                        backgroundColor: 'grey'
                    },
                    content: {
                        color: 'orange'
                    }
                }
            }
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            >
            <Calendar />
            <div>
                <button onClick={() => setModalIsOpen(false)}> Close </button>
            </div>

        </Modal>
    </div>
  );
}

export default App;
