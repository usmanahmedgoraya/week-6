"use client";

import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

// PromptCardList Component
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {
        data?.map((post) => {
          return <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        })}
    </div>
  )

}

const Feed = () => {
  const [searchText, setSearchText] = useState();
  const [post, setPost] = useState()
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults] = useState([])



  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return post.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const fetchPost = async () => {
    const res = await fetch("/api/prompt");
    const data = await res.json();
    console.log(data)
    setPost(data)
  }

  useEffect(() => {

    fetchPost()
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type="text" name="search" id="search" placeholder='Search for a tag a username' value={searchText} onChange={handleSearchChange} required className='search_input peer' />
      </form>
      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={post} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed