import React, { useEffect, useState, useRef } from "react";
import * as signalR from "@microsoft/signalr";

export const Chats = () => {
  const [connection, setConnection] = useState(null);
  const [usuario, setUsuario] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [messageList, setMessageList] = useState([]);

  //Función que recibe los mensajes y loss guarda en el estado tipo array
  const receiveMessage = (message) => {
    setMessageList((prevMessageList) => [...prevMessageList, message]);
  };

  //Crea la conexion cuando se monta el componente y la almacena en un estado
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7060/chathub")
      .build();

    setConnection(newConnection);

    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Conectado al servidor SignalR");
          connection.on("RecibirMensaje", receiveMessage);
          // Carga los mensajes almacenados en el localStorage al iniciar la aplicación
          const storedMessages = localStorage.getItem("messages");
          console.log(storedMessages);
          if (storedMessages) {
            setMessageList(JSON.parse(storedMessages));
          }
        })
        .catch((error) => {
          console.error("Error al conectar con SignalR: ", error);
        });
    }
  }, [connection]);

  const enviarMensaje = (message) => {
    connection.send("EnviarMensaje", message).catch((error) => {
      console.error("Error al enviar el mensaje: ", error);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const contenido = {
      user: usuario,
      messageContent: mensaje,
    };

    if (mensaje && mensaje !== "" && usuario && usuario !== "") {
      enviarMensaje(contenido);
      setMensaje("");
    } else {
      setError("Por favor, ingrese todos los datos!");
    }
  };

  const handleUsuarioChange = (event) => {
    setUsuario(event.target.value);
  };

  const handleMensajeChange = (event) => {
    setMensaje(event.target.value);
  };

  useEffect(() => {
    // Almacena los mensajes en el localStorage cada vez que se actualiza la lista de mensajes
    if (messageList.length !== 0) {
      localStorage.setItem("messages", JSON.stringify(messageList));
    }
  }, [messageList]);

  return (
    <div className="h-screen bg-neutral-800 flex flex-col">
      <div className="h-full w-full flex flex-col justify-around items-center">
        {messageList.length === 0 ? (
          <div className="w-full h-2/5 border border-neutral-700 flex items-center justify-center">
            <p className="text-xl md:text-4xl text-neutral-300">
              No hay mensajes por el momento...
            </p>
          </div>
        ) : (
          <div className="w-full h-2/5 border border-neutral-700 flex items-center justify-start flex-col gap-10 overflow-y-scroll pt-20 ">
            {messageList.map((message, index) => (
              <div
                key={index}
                className="border min-w-fit w-  rounded-lg bg-neutral-900 text-slate-200 flex py-2 px-4">
                <span className="flex justify-between ">
                  <p>{message.user}:</p>
                </span>
                <span className="flex justify-between pl-4">
                  <p>{message.messageContent}</p>
                </span>
              </div>
            ))}
          </div>
        )}
        <form className="border border-neutral-700 rounded-md w-full h-2/5 flex flex-col justify-around items-center">
          <div className="flex flex-col gap-1 w-4/5 md:w-1/2 group">
            <label
              htmlFor="usuario"
              className="text-slate-300 text-lg font-bold group group-hover:text-sky-500">
              Usuario:
            </label>
            <input
              className="px-3 py-2 rounded-lg text-lg text-neutral-950 focus:outline-none group focus:group/focus group-focus:text-indigo-500"
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Ingresa tu nombre de usuario"
              value={usuario}
              onChange={handleUsuarioChange}
            />
          </div>

          <div className="flex flex-col gap-1 w-4/5 md:w-1/2 group">
            <label
              htmlFor="mensaje"
              className="text-slate-300 text-lg font-bold group group-hover:text-sky-500">
              Mensaje:
            </label>
            <textarea
              className="px-3 py-2 rounded-lg text-lg text-neutral-950 focus:bordern resize-none focus:outline-none"
              rows={5}
              type="text"
              id="mensaje"
              name="mensaje"
              placeholder="Ingresa tu mensaje"
              value={mensaje}
              onChange={handleMensajeChange}
            />
          </div>
          {error && <p className="text-red-500 font-bold">{error}</p>}
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-sky-700 text-white w-40 py-3 rounded-lg hover:bg-sky-600 focus:outline-none">
            Enviar Mensaje
          </button>
        </form>
      </div>
      <footer className="text-lg w-full bg-neutral-900 text-white font-bol text-center py-2">
        &copy; 2023 - Yuliam Andrey Osorio Puerta
      </footer>
    </div>
  );
};
