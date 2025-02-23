import React, { useEffect, useState } from "react";
import {
  useGetAllCategoriesQuery,
  useDeleteCategoryByIdMutation,
  useEditCategoryMutation,
} from "../../../redux/services/product"; // Filmler için
import { useGetAllTvShowsQuery } from "../../../redux/services/tvApi"; // TV Şovları için
import styles from "./index.module.scss";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [editingItem, setEditingItem] = useState(null); // Hem filmler hem de diziler için

  // Filmler için Redux sorgusu
  const {
    data: moviesData,
    error: moviesError,
    isLoading: moviesLoading,
  } = useGetAllCategoriesQuery();

  // TV Şovları için Redux sorgusu
  const {
    data: tvData,
    error: tvError,
    isLoading: tvLoading,
  } = useGetAllTvShowsQuery();

  const [deleteMovie] = useDeleteCategoryByIdMutation();
  const [editCategory] = useEditCategoryMutation();

  useEffect(() => {
    if (moviesData?.data) {
      setMovies(moviesData.data);
    }
  }, [moviesData]);

  useEffect(() => {
    if (tvData?.data) {
      setTvShows(tvData.data);
    }
  }, [tvData]);

  const handleDelete = (id) => {
    deleteMovie(id);
  };

  const handleEdit = (item) => {
    setEditingItem(item); // Düzenlemeye başlanan öğeyi kaydet
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await editCategory({ id: editingItem._id, ...editingItem }); // Güncelleme isteği
      setEditingItem(null); // Düzenleme modunu kapat
    } catch (error) {
      console.log("Güncelleme hatası:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingItem((prev) => ({ ...prev, [name]: value }));
  };

  if (moviesLoading || tvLoading) return <p>Loading...</p>;
  if (moviesError || tvError) return <p>Error fetching data.</p>;

  return (
    <div className={styles.moviesPage}>
      <h2>Movies & TV Shows</h2>

      {/* 🎬 Filmler Tablosu */}
      {movies.length > 0 ? (
        <>
          <h3>Movies List</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Year</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.releaseDate}</td>
                  <td>{(movie.rating / 2).toFixed(1)} ⭐</td>
                  <td>
                    <button onClick={() => handleEdit(movie)}>Edit</button>
                    <button onClick={() => handleDelete(movie._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No movies available.</p>
      )}

      {/* 📺 TV Şovları Tablosu */}
      {tvShows.length > 0 ? (
        <>
          <h3>TV Shows List</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Seasons</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tvShows.map((show) => (
                <tr key={show._id}>
                  <td>{show.title}</td>
                  <td>{show.genre}</td>
                  <td>{show.seasons}</td>
                  <td>{(show.rating / 2).toFixed(1)} ⭐</td>
                  <td>
                    <button onClick={() => handleEdit(show)}>Edit</button>
                    <button onClick={() => handleDelete(show._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No TV shows available.</p>
      )}

      {/* Düzenleme Formu */}
      {editingItem && (
        <div className={styles.editForm}>
          <h3>Edit {editingItem.seasons ? "TV Show" : "Movie"}</h3>
          <form onSubmit={handleUpdate}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={editingItem.title}
                onChange={handleChange}
              />
            </label>
            <label>
              Genre:
              <input
                type="text"
                name="genre"
                value={editingItem.genre}
                onChange={handleChange}
              />
            </label>
            <label>
              {editingItem.seasons ? "Seasons" : "Year"}:
              <input
                type="text"
                name={editingItem.seasons ? "seasons" : "releaseDate"}
                value={
                  editingItem.seasons
                    ? editingItem.seasons
                    : editingItem.releaseDate
                }
                onChange={handleChange}
              />
            </label>
            <label>
              Rating:
              <input
                type="number"
                name="rating"
                value={editingItem.rating}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditingItem(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Movies;
