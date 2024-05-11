import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import img from '../../../../assets/donor_icon.png';
import RequestCard from '../../../../AdminPage/DonorsList/RequestCard';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import { Box, TextField } from '@mui/material';
import Popup from '../../../../AdminPage/Popup';

export default function ProductsView(props) {
  const pageTitle = props.title;
  const sort = props.sort;
  const filter = props.filter;
  const [openFilter, setOpenFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const [currentInfo, setCurrentInfo] = useState(null);

  const onPopupClose = () => {
    setOpenPopup(false);
  }

  const onPopupOpen = () => {
    setOpenPopup(true);
  }

  const cards = [
    {
      date: '20/02/2020', name: 'Dr. Hamada', image: img, id: 1, info: {
        name: 'Dr. Hamada', age: 12
      }
    },
    {
      date: '20/02/2020', name: 'Dr. Ahmed Hamada', image: img, id: 2, info: {
        name: 'Dr. Ahmed Hamada', age: 12
      }
    },
    {
      date: '20/02/2020', name: 'Dr. Ahmed Mohamed Hamada', image: img, id: 3, info: {
        name: 'Dr. Ahmed Mohamed Hamada', age: 12
      }
    },
    {
      date: '20/02/2020', name: 'Dr. Wael', image: img, id: 4, info: {
        name: 'Dr. Wael', age: 12
      }
    },
    {
      date: '20/02/2020', name: 'Dr. Gohary', image: img, id: 5, info: {
        name: 'Dr. Gohary', age: 12
      }
    },
    {
      date: '20/02/2020', name: 'Prof Yasser', image: img, id: 6, info: {
        name: 'Prof Yasser', age: 12
      }
    },
    {
      date: '20/02/2020', name: 'Dr. Tawfik', image: img, id: 7, info: {
        name: 'Dr. Tawfik', age: 12
      }
    },
    {
      date: '20/02/2020', name: 'Prof Slim', image: img, id: 8, info: {
        name: 'Prof Slim', age: 12
      }
    },
  ];

  const filteredCards = searchTerm
    ? cards.filter((card) =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : cards;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container>
      {openPopup && <Popup onClose={onPopupClose} info={currentInfo} />}
      <Box
        sx={{
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: '#fff',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: '#000', fontFamily: 'sans-serif', fontWeight: 'bold' }}
        >
          {pageTitle}
        </Typography>
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          {filter && (
            <ProductFilters
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
          )}
          <TextField
            name="email"
            label="Search Donor"
            onChange={handleChange}
            type='text'
            variant='filled'
          />
          {sort && <ProductSort />}
        </Stack>
      </Stack>

      <Grid container spacing={3} mb={2}>
        {filteredCards.map((card) => (
          <Grid key={card.id} xs={12} sm={6} md={3}>
            <RequestCard date={card.date} name={card.name} image={card.image} id={card.id} onClick={() => {
              setCurrentInfo(card.info);
              onPopupOpen();
            }} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
