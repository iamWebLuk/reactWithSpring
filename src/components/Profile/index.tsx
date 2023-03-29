import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { Button } from '@mui/material';

const Profile = () => {
  const { user } = useContext(UserContext);
  console.log('#');
  console.log(user);
  console.log('#');

  function printOut() {
    console.log(user);
  }

  console.log('test');
  console.log(typeof user);
  return (
    <div>
      Hallo
      {/*{user['id']}*/}
      <Button onClick={printOut}>test</Button>
    </div>
  );
};

export default Profile;
