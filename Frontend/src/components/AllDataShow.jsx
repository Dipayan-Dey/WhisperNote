import React, { useEffect, useState } from "react";
import { api } from "../api/letterapi";

export default function AllDataShow() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const showalldata = () => {
    api
      .getAllLetters()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    showalldata();
    // console.log(res.length)
  }, []);
  // console.log(data.length)
  const deleteLetterhandler = (id) => () => {
   api.deleteLetter(id).then((_) => {
      alert("Letter deleted successfully");
      showalldata();
    });
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl animate-pulse">
        Loading encrypted memories...
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center mt-10 ">
        <h1 className="text-ceter text-2xl  font-bold bg-amber-300 p-3 rounded-4xl">
          {" "}
          Count Of All Data : {data.length}{" "}
        </h1>
      </div>
      <div className="min-h-screen px-4 py-10 text-black flex justify-center">
        <div className="max-w-8xl w-full grid gap-8 md:grid-cols-2">
          {data.map((letter, index) => (
            <div
              key={letter._id}
              className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl p-6
                       transform transition duration-500 hover:-translate-y-2
                       hover:shadow-2xl animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Header */}
              <div className="mb-4 border-b pb-2 flex justify-between items-center">
               <div>
                 <p className="text-xs uppercase tracking-widest text-gray-500">
                  Letter ID
                </p>
                <p className="font-mono text-sm break-all text-indigo-600">
                  {letter._id}
                </p>
               </div>
                <button
                  onClick={deleteLetterhandler(letter._id)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition right-0 "
                >
                  Delete
                </button>
              </div>

              {/* Messages */}
              <div className="space-y-3">
                {letter.messages.map((msg, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-rose-50 to-orange-50
                             rounded-xl p-3 text-sm shadow-inner
                             animate-fade-in-up"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <p className="text-gray-800 leading-relaxed">{msg.text}</p>
                    <p className="text-[10px] text-right text-gray-400 mt-2">
                      {new Date(msg.time).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
