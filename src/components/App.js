import { useState } from 'react';
import { useGetPostsQuery, useCreatePostMutation, useDeletePostMutation, useUpdatePostMutation } from '../api/postsApi';

function App() {
  const { data: posts, error, isLoading } = useGetPostsQuery();
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [editingPost, setEditingPost] = useState(null);

  const handleCreatePost = () => {
    if (newPost.title && newPost.body) {
      createPost(newPost);
      setNewPost({ title: '', body: '' });
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setNewPost({ title: post.title, body: post.body });
  };

  const handleUpdatePost = () => {
    if (editingPost && newPost.title && newPost.body) {
      updatePost({ id: editingPost.id, updatedPost: newPost });
      setEditingPost(null);
      setNewPost({ title: '', body: '' });
    }
  };

  const handleDeletePost = (id) => {
    deletePost(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="App">
      <h1>CRUD Operations with RTK Query</h1>

      {/* Create/Update Post Form */}
      <input
        type="text"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        placeholder="Post title"
      />
      <textarea
        value={newPost.body}
        onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        placeholder="Post body"
      />
      <button onClick={editingPost ? handleUpdatePost : handleCreatePost} disabled={isCreating || isUpdating}>
        {editingPost ? (isUpdating ? 'Updating...' : 'Update Post') : (isCreating ? 'Creating...' : 'Create Post')}
      </button>

      {/* Display Posts */}
      <div>
        {posts?.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button onClick={() => handleEditPost(post)}>Edit</button>
            <button onClick={() => handleDeletePost(post.id)} disabled={isDeleting}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
