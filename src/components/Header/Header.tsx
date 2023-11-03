import { Button, Box } from '@mui/material';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import './Header.scss';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { ReactComponent as YennLogo } from '@/images/Yenn.svg';
import YennLogoSmall from '@/images/YennIcon.png';
import FullScreenDialog from '../TitleModalButton/FullScreenModal';
import { useAppContext } from '../../AppContext';
import { FaUser } from 'react-icons/fa';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  height: '50%',
  margin: 'auto 0',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'black',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'gray',

  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export const SearchAppBar = () => {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState<string>();
  const { isLoggedIn, postContent, setTabIndex, setKeyword, setPostContent, setTagId } =
    useAppContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default form submission behavior
      // Navigate to the search results page with the search query as a parameter
      setTabIndex(-1);
      setTagId();
      setKeyword(searchInput);
      setPostContent('');
      navigate('/');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <div className='d-flex'>
          <Button
            disableRipple
            onClick={() => {
              setTabIndex(0);
              setTagId();
              setKeyword('');
              setSearchInput('');
              setPostContent('');
              navigate('/');
            }}
          >
            <YennLogo height='20px' className='logo-big' style={{ margin: 'auto 0' }} />
            <img src={YennLogoSmall} className='logo-small' />
          </Button>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={searchInput}
              placeholder='Search…'
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          {isLoggedIn ? (
            <Button
              onClick={() => navigate('/editor')}
              sx={{ height: 60, width: 60, margin: 'auto 0', borderRadius: '50%' }}
              size='small'
              variant='contained'
            >
              <FaUser />
            </Button>
          ) : (
            <Button
              onClick={() => navigate('/login')}
              sx={{ height: '60%', margin: 'auto 0' }}
              size='small'
              variant='contained'
            >
              {'Login'}
            </Button>
          )}
          {postContent && (
            <div className='titleButton'>
              <FullScreenDialog postContent={postContent} />
            </div>
          )}
        </div>
      </AppBar>
    </Box>
  );
};
