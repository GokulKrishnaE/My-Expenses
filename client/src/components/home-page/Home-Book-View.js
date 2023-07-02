import React from 'react';
import { useState,useContext,useEffect } from 'react';
import axios from 'axios';
import { HomeContext } from '../home';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const HomeBookView = (props) => {

    const homeContextData = useContext(HomeContext)
    const token = homeContextData.token
    const books = homeContextData.books

    const categories = props.categories
    const email = props.email
    const reFresh = props.reFresh

    const navigate = useNavigate()

    const [newBook,setBookName] = useState({bookName:'',totalearning:0,totalspending:0})

    const addBook = async() =>{
            const url = `${process.env.REACT_APP_SERVERURL}/api/books/addbook`
            await axios.post(url,newBook,{
              headers: {
                  Authorization: `Bearer ${token}`
              },
          })
            .then(res => {
                toast('item has been added',{
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    type: "success"
                  })
                  reFresh()
            })
    }
    const deleteBook = async (id,bookname) =>{
        const currentBookname = bookname
        axios.delete(`${process.env.REACT_APP_SERVERURL}/api/books/deleteBook/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then(res=>{
            axios.delete(`${process.env.REACT_APP_SERVERURL}/api/books/deleteExpense/${currentBookname}`,{
            headers: {
                Authorization: `Bearer ${token}`
            },
            })
        }).then(res=>{
            axios.delete(`${process.env.REACT_APP_SERVERURL}/api/books/deleteEarning/${currentBookname}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
        }).then(res =>{
            toast('item has been deleted',{
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                type: "success"
              })
              reFresh()
        })
        
    }
    function openBookView(bookname){
        navigate('/bookDetails', { state: { bookname:bookname,categories:categories,email:email} });
    }
    return (
        <div>
            <div className='widgetBox'>
                <div className='row'>
                    {books.map((book,index)=>{
                        return(<div className="col-lg-3 mb-3 position-relative" key={index}>
                        <div role="button" onClick={()=>openBookView(book.bookname)}>
                            <div className='book'>
                                <h2 className='wigetTitle widgetTitle2 viewMode'>{book.bookname}</h2>
                            </div>
                        </div>
                        <i className='fas fa-trash-can text-danger deleteBookIcon' onClick={()=>deleteBook(book.id,book.bookname)}></i>
                        </div>)
                    })}
                    <div className="col-lg-3 mb-3 position-relative">
                        <div>
                            <div className='book'>
                                <input type='text' className='bookTitle' placeholder='Enter the book name' onChange={(e)=>setBookName({...newBook,bookName:e.target.value})}/>
                                <button className='btn btn-primary saveBookBtn plusButton' onClick={addBook}><i className='fas fa-plus'></i></button>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
            {/* <button className="addTrip" onClick={addBook}></button> */}
        </div>
    );
}

export default HomeBookView;
