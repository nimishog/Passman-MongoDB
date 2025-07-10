import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const [TogglePass, setTogglePass] = useState(false)
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json();
        // console.log(passwords);
        setpasswordArray(passwords);
    }
    useEffect(() => {
        getPasswords();
    }, [])

    const onChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }
    const showPassword = () => {
        setTogglePass(!TogglePass)
    }
    const savePassword = async () => {
        if (!form.site || !form.username || !form.password) {
            alert("Please fill all fields!");
            return;
        }
        toast('Saved successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
        setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        setform({ site: "", username: "", password: "" })

    }
    const deletePassword = async (id) => {
        if (confirm("Are you sure?")) {
            toast('Successfully Deleted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: id }) })
        }
    }
    const editPassword = async (id) => {
        setform(passwordArray.filter(i => i.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id !== id))
        await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: id }) })
    }
    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]">
            </div></div>

            <div className="p-2 md:mx-auto md:container md:px-40 md:py-16 min-h-[87.2vh]">
                <h1 className='text-4xl font-bold text-center'>
                    <span className="text-green-500">&lt;</span>
                    Pass
                    <span className='text-green-500'>MAN/ &gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own password manager</p>

                <div className="text-black flex flex-col items-center p-4 gap-5">
                    <input onChange={(e) => onChange(e)} name='site' value={form.site} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full px-4 py-1' type="text" />
                    <div className="flex flex-col md:flex-row gap-5 w-full">
                        <input onChange={(e) => onChange(e)} name='username' value={form.username} placeholder='Enter Username' className='rounded-full border border-green-500 w-full px-4 py-1' type="text" />
                        <div className="relative">
                            <input onChange={(e) => onChange(e)} name='password' value={form.password} placeholder='Enter Password' className='rounded-full border border-green-500 w-full px-4 pr-8 py-1' type={TogglePass ? "text" : "password"} />
                            <span className="absolute  right-[3px] top-[4px] cursor-pointer" onClick={showPassword}>
                                <img className='p-1' width={26} src={TogglePass ? "icons/eyecross.png" : "/icons/eye.png"} alt="eye" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400 rounded-full px-8 py-2 w-fit gap-2 cursor-pointer hover:bg-green-300 border-2 border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover">
                        </lord-icon>Add password
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full overflow-hidden rounded-md mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className=' text-center py-2 border border-white'>
                                        <div className="flex justify-center items-center">
                                            <span><a href={item.site} target='_blank'>{item.site}</a></span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.site)}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "5px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"></lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border border-white'>
                                        <div className="flex items-center justify-center">
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.username)}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "5px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"></lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border border-white text-center'>
                                        <div className="flex items-center justify-center">
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.password)}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "5px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"></lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border border-white text-center'>
                                        <div className="flex items-center justify-center">
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => editPassword(item.id)}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px" }}
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"></lord-icon>
                                            </div>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => deletePassword(item.id)}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"></lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
