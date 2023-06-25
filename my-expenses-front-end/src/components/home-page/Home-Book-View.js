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

    const [bookName,setBookName] = useState({bookName:'New Book',totalearning:0,totalspending:0})
    const bookObject = {
        bookName: bookName.bookName.replace(/\s+/g, ''),
        totalearning:0,
        totalspending:0
    }

    const addBook = async() =>{
            const url = `http://localhost:8800/api/books/addbook`
            await axios.post(url,bookObject,{
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
        axios.delete(`http://localhost:8800/api/books/deleteBook/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then(res=>{
            console.log('fromt delete expense')
            axios.delete(`http://localhost:8800/api/books/deleteExpense/${currentBookname}`,{
            headers: {
                Authorization: `Bearer ${token}`
            },
            })
        }).then(res=>{
            console.log('fromt delete earnng')
            axios.delete(`http://localhost:8800/api/books/deleteEarning/${currentBookname}`,{
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
        console.log(bookname)
        navigate('/bookDetails', { state: { bookname:bookname,categories:categories,email:email } });
    }
    return (
        <div>
            <div className='widgetBox'>
                <div className='row'>
                    {books.map((book,index)=>{
                        return(<div className='col-lg-3 mb-3 position-relative' key={index}>
                        <div role="button" onClick={()=>openBookView(book.bookname)}>
                            <div className='book'>
                                <h2 className='bookTitle'>{book.bookname}</h2>
                                <p>Total Earning: <span>{book.totalearning}</span></p>
                                <p>Total Spending: <span>{book.totalspending}</span></p>
                            </div>
                        </div>
                        <i className='fas fa-pencil text-primary bookDeleteButton bookEditButton'></i>
                        <i className='fas fa-trash-can text-danger bookDeleteButton' onClick={()=>deleteBook(book.id,book.bookname)}></i>
                    </div>)
                    })}
                </div>
            </div>
            <button className="addTrip" onClick={addBook}></button>
        </div>
    );
}

export default HomeBookView;
