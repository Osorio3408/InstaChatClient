import React, { useContext, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ImSpinner6 } from "react-icons/im";
import { AppName } from "../../Components/UI/AppName/AppName";
import { UserContext } from "../../Context/UserContext";
import { SignOff } from "../../Components/UI/SignOff/SignOff";

export const Chats = () => {
  const navigate = useNavigate();
  const [connection, setConnection] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(UserContext);

  console.log(user);

  //Función que recibe los mensajes y los guarda en el estado tipo array
  const receiveMessage = (message) => {
    setMessageList((prevMessageList) => [...prevMessageList, message]);
  };

  //Crea la conexión cuando se monta el componente y la almacena en un estado
  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      navigate("/SignIn");
    } else {
      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl("https://instachat.azurewebsites.net/chathub")
        .build();

      setConnection(newConnection);

      return () => {
        if (newConnection) {
          newConnection.stop();
        }
      };
    }
  }, [navigate]);

  useEffect(() => {
    if (connection) {
      setIsLoading(true);
      connection
        .start()
        .then(() => {
          setIsLoading(false);
          connection.on("RecibirMensaje", receiveMessage);
          // Carga los mensajes almacenados en el localStorage al iniciar la aplicación
          const storedMessages = localStorage.getItem("messages");
          if (storedMessages) {
            setMessageList(JSON.parse(storedMessages));
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error al conectar con SignalR: ", error);
        });
    }
  }, [connection]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const contenido = {
      user: user.unique_name,
      messageContent: mensaje,
    };

    if (mensaje && mensaje !== "") {
      connection.send("EnviarMensaje", contenido);
      setMensaje("");
    } else {
      setError("Por favor, ingrese todos los datos!");
    }
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
      <header className="bg-neutral-900 h-32 flex items-center">
        <nav className="px-1 md:px-5 flex items-center w-full">
          <Link to={"/"}>
            <AppName />
          </Link>
          <ul className="flex justify-end w-full text-gray-400 gap-5 md:gap-10 text-lg items-center  md:text-xl">
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/Profile">Perfíl</Link>
            </li>
            <SignOff />
          </ul>
        </nav>
      </header>
      <div className="h-full w-full flex flex-col justify-between items-center">
        {isLoading ? (
          <div className="w-full h-2/5 border border-neutral-700 flex items-center justify-center">
            <span className="text-xl md:text-4xl text-neutral-300">
              <ImSpinner6 className="text-4xl animate-spin" />
            </span>
          </div>
        ) : messageList.length === 0 ? (
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
