import React ,{ useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async() => {
        let req = fetch("http://localhost:3000/")
        let passwords = await (await req).json()
        setPasswordArray(passwords)
        console.log(passwords)
    }

    useEffect(() => {
        getPasswords()
        

    }, [])


    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("/icons/eyecross.png")) {
            ref.current.src = "/icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "/icons/eyecross.png"
            passwordRef.current.type = "text"
        }
    }

    const savePassword = async () => {
        if(form.site.length > 2 && form.username.length > 2 && form.password.length > 2) {
            setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
            let res = await fetch("http://localhost:3000/", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({...form, id: uuidv4() })})

            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
            setForm({site: "", username: "", password: "" })
            toast.success('Password saved successfully!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            toast.error('Error: Password cannot be saved!')
        }
    }

    const editPassword = (id) => {
        // console.log("Editing password with id", id)
        setForm(passwordArray.filter(i=>i.id === id)[0])

        setPasswordArray(passwordArray.filter(i=>i.id !== id))
        
    }

    const deletePassword = async (id) => {
        console.log("Deleting password with id", id)
        let c = confirm("Are you sure you want to delete this password")
        if(c) {
            setPasswordArray(passwordArray.filter(item=>item.id !== id))
            let res = await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({...form, id})})

            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id !== id)))
            toast.success('Password deleted successfully!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast.success('Copied to clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="relative inset-0 -z-10 h-full w-full bg-gray-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div className="p-2 md:mycontainer min-h-[83vh] w-full">
                <h1 className='text-3xl font-bold text-center'>
                    <span>Pass</span>
                    <span className='text-gray-400'>Manager 🔑</span>
                </h1>
                <p className='text-gray-600 text-center text-xl'>Save your Password. Safely!</p>

                <div className="flex flex-col p-4 gap-6 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='p-4 py-2 rounded-full border border-purple-500 w-full' type="text" name='site' id='site' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-6">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='p-4 py-1 rounded-full border border-purple-500 w-full' type="text" name='username' id='username' />

                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='p-4 py-2 rounded-full border border-purple-500 w-full' type="password" name='password' id='password' />
                            <span className='absolute cursor-pointer right-[4px] top-[4px]' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={34} src="./icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center rounded-full bg-purple-600 px-6 py-2 w-auto hover:bg-purple-500 text-white text-lg font-bold gap-3 border border-gray-500'>
                        <lord-icon
                            src="https://cdn.lordicon.com/sbnjyzil.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#121331,secondary:#e4e4e4">
                        </lord-icon>
                        Save Password
                    </button>
                </div>

                <div className="passwords">
                    <h2 className='text-2xl font-bold py-4'>Your Own Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords saved till now.</div>}
                    {passwordArray.length !== 0 && <table className="table-auto w-full rounded-xl overflow-hidden mb-2">
                        <thead className='bg-purple-600 text-white '>
                            <tr>
                                <th className='py2'>Website</th>
                                <th className='py2'>Username</th>
                                <th className='py2'>Password</th>
                                <th className='py2'>Actions</th>
                            </tr>
                        </thead>

                        <tbody className='bg-purple-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='text-center py-2 border border-white' >
                                        <div className='flex items-center justify-center '>
                                            <a href="{item.site}" target='_blank'>{item.site}</a>
                                            <div className='cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <img style={{ "width": "25px", "height": "25px" }} src="./icons/copy.png" alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center py-2 border border-white'>
                                        <div className='flex items-center justify-center'>
                                            <span>{item.username}</span>
                                            <div className='cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <img style={{ "width": "25px", "height": "25px" }} src="./icons/copy.png" alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center py-2 border border-white'>
                                        <div className='flex items-center justify-center'>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <img style={{ "width": "25px", "height": "25px" }} src="./icons/copy.png" alt="" />

                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center py-2 border border-white'>
                                        <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/exymduqj.json"
                                                trigger="hover"
                                                state="hover-line"
                                                colors="primary:#121331,secondary:#a866ee"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => {deletePassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                trigger="in"
                                                state="in-trash-empty"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div >
            </div >
        </>
    )
}

export default Manager
