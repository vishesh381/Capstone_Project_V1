import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider, Group } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { updateState } from '../../Slices/dataStoreSlice';

function BottomNavigation(props) {
  const dispatch = useDispatch();

  const handlePrevious = () => {
    dispatch(updateState({
      key: 'errorMessages',
      value: {},
    }));
  };

  const handleNext = () => {
    if (!props.isFormValid) {
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

  return (
    <div className="mt-8 px-6">
      <Divider my="sm" color="brightSun.5" />
      <Group justify="space-between" mt="lg" className="flex-col md:flex-row">
        <Link to={props.prevPagePath}>
          <Button
            variant="outline"
            color="brightSun"
            radius="md"
            size="md"
            onClick={handlePrevious}
          >
            Previous
          </Button>
        </Link>

        <Link to={props.isFormValid ? props.nextPagePath : '#'}>
          <Button
            variant="filled"
            color="brightSun"
            radius="md"
            size="md"
            onClick={handleNext}
          >
            {window.location.pathname === '/detailsfillingpage/keyskills' ? 'Preview' : 'Next'}
          </Button>
        </Link>
      </Group>
    </div>
  );
}

export default BottomNavigation;
