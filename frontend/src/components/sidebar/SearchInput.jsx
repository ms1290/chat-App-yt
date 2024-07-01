import React, { useState } from 'react'
import { BsSend } from "react-icons/bs";
import useGetConversations from '../../hooks/useGetConversations';
import useConversation from '../../zustand/useConversation';
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [search,setSearch] = useState("");
  const {setSelectedConversation } = useConversation();
  const {conversations} = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return;
    if(search.length < 3){
      return toast.error('Search term must be at least 3 characters long');
    }

    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));
    
    if(conversation){
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
        <input type='text' placeholder='Search...' className='input-bordered rounded-full w-full pl-4'
        value = {search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ height: '3rem'}}
        />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
        <BsSend className='w-6 h-6 text-white' />
        </button>
    </form>
  );
};

export default SearchInput;