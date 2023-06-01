import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useSelector } from 'react-redux';

import { RatedCards } from '../index';
import { useGetUsersListQuery } from '../../services/TMBD';

function Profile() {
  const { user } = useSelector((state) => state.user);
  const { data: favoriteMovies, refetch: refetchFavorites } =
    useGetUsersListQuery({
      accountId: user.id,
      sessionId: localStorage.getItem('session_id'),
      page: 1,
      listName: 'favorite/movies',
    });
  const { data: watchlistMovies, refetch: refetchWatchlisted } =
    useGetUsersListQuery({
      accountId: user.id,
      sessionId: localStorage.getItem('session_id'),
      page: 1,
      listName: 'watchlist/movies',
    });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Typography variant="h5">
          Add favourite or watchlist same movies to see them here!
        </Typography>
      ) : (
        <Box>
          <RatedCards title="Favorite Movies" movies={favoriteMovies} />
          <RatedCards title="Watchlist" movies={watchlistMovies} />
        </Box>
      )}
    </Box>
  );
}

export default Profile;
