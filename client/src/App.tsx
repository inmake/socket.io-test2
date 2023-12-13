/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { socket } from "./socket";

interface User {
  id: string;
  x: number;
  y: number;
}

function App() {
  const [user, setUser] = useState<User>();
  const [users, setUsers] = useState<User[]>();
  // const canvasRef = useRef<HTMLCanvasElement>(null);

  // useEffect(() => {
  //   // var canv = canvasRef.current;
  //   if (!canvasRef.current) return;
  //   const context = canvasRef.current.getContext("2d");
  //   if (!context) return;

  //   canvasRef.current.height = window.innerHeight;
  //   canvasRef.current.width = window.innerWidth;

  //   let isMouseDown = false;

  //   canvasRef.current.addEventListener("mousedown", () => {
  //     isMouseDown = true;
  //   });

  //   canvasRef.current.addEventListener("mouseup", () => {
  //     isMouseDown = false;
  //     context.beginPath();
  //   });

  //   context.lineWidth = 60;
  //   canvasRef.current.addEventListener("mousemove", (e) => {
  //     if (isMouseDown) {
  //       // socket.volatile.emit("update", user);

  //       context.lineTo(e.clientX, e.clientY);
  //       context.stroke();

  //       context.beginPath();
  //       context.arc(e.clientX, e.clientY, 30, 0, Math.PI * 2);
  //       context.fill();

  //       context.beginPath();
  //       context.moveTo(e.clientX, e.clientY);
  //     }
  //   });

  //   return () => {
  //     if (!canvasRef.current) return;
  //     canvasRef.current.removeEventListener("mousedown", () => {
  //       isMouseDown = true;
  //     });
  //     canvasRef.current.removeEventListener("mouseup", () => {
  //       isMouseDown = false;
  //       context.beginPath();
  //     });
  //   };
  // }, []);

  useEffect(() => {
    if (!user) return;

    console.log(user);

    socket.volatile.emit("update", user);
  }, [user]);

  function handleMouseDown(e: MouseEvent) {
    console.log(e);
  }

  function handleMouseUp(e: MouseEvent) {
    console.log(e);
  }

  function handleMouseMove(e: MouseEvent) {
    setUser((prev) => {
      if (!prev) return;
      return { id: prev.id, x: e.clientY, y: e.clientX };
    });
  }

  useEffect(() => {
    // socket

    socket.connect();

    socket.on("connect", () => {
      setUser({ id: socket.id, x: 0, y: 0 });
    });

    socket.on("update", (users) => {
      setUsers(users);
    });

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* <canvas ref={canvasRef}></canvas> */}
      <div className="absolute">{JSON.stringify(user)}</div>
    </>
  );
}

export default App;
