import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Text, Notification, Transition } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconCheck } from '@tabler/icons-react';

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClick = () => {
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      navigate('/resume-builder');
    }, 1500); // total animation + delay
  };

  return (
    <div className="relative w-full mt-10 px-4">
      {/* Success Notification on top of the card */}
      <Transition mounted={showSuccess} transition="fade" duration={500} timingFunction="ease">
        {(styles) => (
          <Notification
            icon={<IconCheck size={18} />}
            color="green"
            radius="md"
            style={{
              ...styles,
              position: 'absolute',
              top: -60,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
              width: 'fit-content',
            }}
          >
            Taking you to the Resume Builder!
          </Notification>
        )}
      </Transition>

      <Card
        shadow="md"
        radius="lg"
        p={isMobile ? 'md' : 'xl'}
        withBorder
        className="w-full text-center bg-white"
      >
        <Text size={isMobile ? 'lg' : 'xl'} fw={600} mb="md">
          Want a personalised Resume?
        </Text>
        <Button
          variant="gradient"
          gradient={{ from: 'yellow', to: 'orange' }}
          size={isMobile ? 'sm' : 'md'}
          radius="xl"
          onClick={handleClick}
        >
          Generate Resume
        </Button>
      </Card>
    </div>
  );
};

export default ResumeBuilder;
