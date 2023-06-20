"use client";
import {useState, useEffect} from 'react'
import IdeaCard from './IdeaCard';


const IdeaCardList = ({data, handleTagClick}) => {
  return(
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <IdeaCard
          key = {post._id}
          post = {post}
          handleTagClick = {handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async() => {
    const response = await fetch ('/api/idea');
    const data = await response.json();

    setPosts(data);
  }


  useEffect(() => {
    fetchPosts();
  }, []);
  
  const filterIdeas = (searchText) => {
    const regex = new RegExp(searchText, "i") // 'i' flag for case-insensitive search
    return posts.filter((item) =>
    regex.test(item.creator.username)|| regex.test(item.tag)|| regex.test(item.idea)
    );
  };
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    //debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchedResults = filterIdeas(e.target.value);
        setSearchedResults(searchedResults);
      },500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchedResults = filterIdeas(tagName);
    setSearchedResults(searchedResults);
  };
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
        type='text'
        placeholder='Search for a tag or username'
        value={searchText}
        onChange = {handleSearchChange}
        required
        className='search_input peer'
        />
      </form>

      {searchText ? (
              <IdeaCardList
              data={searchedResults}
              handleTagClick={handleTagClick}
              />
      ):(
        <IdeaCardList
        data={posts}
        handleTagClick={handleTagClick}
        />
      )}

    </section>
  )
}

export default Feed