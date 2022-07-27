import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { User } from '../slices/app';
import Button from '@mui/material/Button';
import { actions } from '../slices';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import CardActions from '@mui/material/CardActions';

export default function UserCard({ user }: { user: User }) {
  const dispatch = useDispatch<AppDispatch>();

  const logout = async () => {
    dispatch(actions.app.logoutAsync());
  }

  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {user.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {user.email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small' onClick={logout}>Logout</Button>
        </CardActions>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={user.picture}
        alt={user.name}
      />
    </Card>
  );
}