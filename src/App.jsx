import React, { useState, useEffect } from 'react';
import SearchComponent from './components/SearchComponent/SearchComponent';
import PaginationComponent from './components/PaginationComponent/PaginationComponent';
import UserCard from './components/UserCard/UserCard';
import PostItem from './components/PostItem/PostItem';
import apiService from './services/apiService';


function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastQuery, setLastQuery] = useState('');
  
  // Fetch users from the API
  useEffect(() => {
    console.log(`Fetching users for page ${currentPage} with query "${searchQuery}"`);
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await apiService.getUsers(currentPage, searchQuery);
        setUsers(response.data);
        const totalPages = parseInt(response.headers['x-pagination-pages'], 10);
        setTotalPages(totalPages);
        setIsLastPage(currentPage >= totalPages);
        const totalResults = parseInt(response.headers['x-pagination-total'], 10);
        setTotalResults(totalResults);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
      setLoading(false);
    };
    
    fetchUsers();
  }, [currentPage, searchQuery]); 
  
  

  // Fetch posts for a selected user
  const fetchPosts = async (userId) => {
    setLoading(true);
    try {
      const response = await apiService.getUserPosts(userId);
      console.log(response);
      setPosts(response.data);
    } catch (error) {
      console.error(`Failed to fetch posts for user ${userId}:`, error);
    }
    setLoading(false);
  };

  // Handlers
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    fetchPosts(user.id);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  
  const handleSearch = (query) => {
    if (query !== lastQuery) {
      setSearchQuery(query);
      setCurrentPage(1);
      setLastQuery(query);
    }
  };
  return (
    <div className="app">
      <SearchComponent onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      <div className="users-list">
      <div key={searchQuery}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} onSelect={handleUserSelect} />
        ))}
      </div>
      </div>
      {selectedUser && (
        <>
          <h2>Posts by {selectedUser.name}</h2>
          <div className="posts-list">
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        </>
      )}
      <PaginationComponent
        currentPage={currentPage}
        isLastPage={isLastPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
  
}

export default App;
