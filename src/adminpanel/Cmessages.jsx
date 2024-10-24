import React, { useEffect, useState } from "react";
import axios from "axios";
import Layer from "./Layer";
const Cmessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(
                  "https://test.populardiagnostic.org/api/messages"
                );
                setMessages(response.data.payload.allMessages);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    return (
        <section className="bg-white w-screen h-screen md:h-screen overflow-auto">
            <div class="grid grid-cols-12">
                <div className="h-screen col-span-2">
                    <Layer />
                </div>
                <div class="col-span-10 flex flex-wrap  z-10 p-5 w-full bg-white">
                    <div class="relative overflow-x-auto w-full p-5  sm:rounded-lg">
                        <div class="pb-4 bg-white p-5 ">
                            <label for="table-search" class="sr-only">
                                Search
                            </label>
                            <div class="relative flex flex-row mt-1">
                                <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg
                                        class="w-4 h-4 text-gray-500 "
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="table-search"
                                    class="block p-2 w-[75%] mr-1 pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Search for items"
                                />

                            </div>
                        </div>
                        <table class="w-full text-sm text-left  rtl:text-right text-gray-500 d">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 d">
                                <tr>
                                    <th className="py-2 px-4 border-b">Name</th>
                                    <th className="py-2 px-4 border-b">Email</th>
                                    <th className="py-2 px-4 border-b">Mobile</th>

                                    <th className="py-2 px-4 border-b">Messages</th>

                                    {/* <th className="py-2 px-4 border-b">Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map((message) => (
                                    <tr key={message._id}>
                                        <td className="py-2 px-4 border-b">{message.name}</td>
                                        <td className="py-2 px-4 border-b">{message.email}</td>
                                        <td className="py-2 px-4 border-b">{message.mobile}</td>
                                        <td className="py-2 px-4 border-b">{message.message}</td>

                                        {/*<td className="py-2 px-4  border-b"><button className="mr-5 p-1 text-white rounded bg-red-600">Delete</button><button className="mr-5 p-1 text-white rounded bg-green-600">Edit</button></td>*/}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cmessages;
