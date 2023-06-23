import React from 'react';
import { useState,useContext,useEffect } from 'react';
import axios from 'axios';
import { HomeContext } from '../home';
import { ToastContainer, toast } from 'react-toastify';

const HomeBookView = () => {

    const homeContextData = useContext(HomeContext)
    const token = homeContextData.token

    const [bookName,setBookName] = useState({bookName:'',totalearning:0,totalspending:0})
    const [books,setBooks] = useState([])
    const [refresh, setRefresh] = useState(false)


    useEffect(()=>{
        if(token){
            axios.get(`http://localhost:8800/api/books/getBooks/`,{
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then(res => {
                setBooks(res.data)
            })
        } 
    },[refresh])
    const addBook = async() =>{
        console.log(bookName)
            const url = `http://localhost:8800/api/books/addbook`
            await axios.post(url,bookName,{
              headers: {
                  Authorization: `Bearer ${token}`
              },
          })
            .then(res => {
                console.log(res)
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
                  setRefresh(!refresh)
            })
    }
    const deleteBook = async (id) =>{
        console.log(id)
        axios.delete(`http://localhost:8800/api/books/deleteBook/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        .then(res =>{
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
              setRefresh(!refresh)
        })
        
    }
    return (
        <div>
            <div className='widgetBox'>
                <div className='d-flex justify-content-between position-relative'>
                    <h1 className='widgetTitle'>Your Books</h1>
                    <p className="text-primary fw-bold" role="button" data-bs-toggle="collapse" data-bs-target="#addBookCollapse" aria-expanded="false" aria-controls="collapseExample">
                            Add New Book
                    </p>
                    <div class="collapse bookCollapse" id="addBookCollapse">
                        <input type='text' className='form-control' value={bookName.bookName} onChange={(e)=>setBookName({...bookName,bookName:e.target.value})}/>
                        <button className='btn btn-sm btn-primary mt-3' onClick={addBook}>Add Book</button>
                    </div>
                </div>

                <div className='row'>
                    {books.map((book)=>{
                        return(<div className='col-lg-3 mb-3 position-relative'>
                        <div role="button">
                            <div className='book'>
                                <h2 className='bookTitle'>{book.bookname}</h2>
                                <p>Total Earning: <span>{book.totalearning}</span></p>
                                <p>Total Spending: <span>{book.totalspending}</span></p>
                            </div>
                        </div>
                        <i className='fas fa-trash-can text-danger bookDeleteButton' onClick={()=>deleteBook(book.id)}></i>
                    </div>)
                    })}
                    
                </div>
            </div>
        </div>
    );
}

export default HomeBookView;
