import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Grid, Stack, Text, Box, Container } from '@mantine/core';
import PersonalInfo from './PersonalInfo';
import WorkEx from './WorkEx';
import Education from './Education';
import KeySkills from './KeySkills';
import { updateState } from '../../Slices/dataStoreSlice';

function DetailsFillingPage() {
  const dispatch = useDispatch();
  const errorMessages = useSelector(state => state.dataStore.errorMessages);

  let isFormValid = true;
  for (let key in errorMessages) {
    if (errorMessages[key] !== "") {
      isFormValid = false;
      break;
    }
  }

  const onSideNavLinkClick = () => {
    if (!isFormValid) {
      alert('Please fill all the necessary details correctly!');
      dispatch(updateState({
        key: 'showErrorMessages',
        value: true,
      }));
    } else {
      dispatch(updateState({
        key: 'showErrorMessages',
        value: false,
      }));
    }
  };

  const navItems = [
    { label: 'Personal Info', path: '/detailsfillingpage/personalinfo' },
    { label: 'Work Experience', path: '/detailsfillingpage/workex' },
    { label: 'Education', path: '/detailsfillingpage/education' },
    { label: 'Key Skills', path: '/detailsfillingpage/keyskills' },
  ];

  return (
    <Container size="xl" pt="md">
      <Paper  className="details-paper" shadow="sm" radius="md" p="md" bg="#fafafa">
        <Grid gutter="md" style={{ minHeight: '100vh' }}>
          {/* Sidebar Navigation */}
          <Grid.Col span={{ base: 12, lg: 3 }}>
            <Stack spacing="sm">
              {navItems.map((item) => (
                <Box
                  key={item.label}
                  component="li"
                  onClick={onSideNavLinkClick}
                  style={{ listStyleType: 'none' }}
                >
                  <Link to={isFormValid ? item.path : '#'} style={{ textDecoration: 'none' }}>
                  <Text
  fw={500}
  size="md"
  px="md"
  py="xs"
  radius="md"
  color="#000000"
  sx={(theme) => ({
    '&:hover': {
      backgroundColor: theme.colors.brightSun?.[0] || '#FFEB3B',
      borderRadius: theme.radius.md,
      cursor: 'pointer',
    }
  })}
>
  {item.label}
</Text>
                  </Link>
                </Box>
              ))}
            </Stack>
          </Grid.Col>

          {/* Main Content Area */}
          <Grid.Col span={{ base: 12, lg: 9 }}>
            <Paper shadow="md" radius="md" p="lg" withBorder>
              <Routes>
                <Route path="/personalinfo" element={<PersonalInfo isFormValid={isFormValid} />} />
                <Route path="/workex" element={<WorkEx isFormValid={isFormValid} />} />
                <Route path="/education" element={<Education isFormValid={isFormValid} />} />
                <Route path="/keyskills" element={<KeySkills isFormValid={isFormValid} />} />
              </Routes>
            </Paper>
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
}

export default DetailsFillingPage;
