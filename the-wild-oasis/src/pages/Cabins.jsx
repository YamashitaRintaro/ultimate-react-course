import { useEffect } from 'react';
import { getCabins } from '../services/apiCabins';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Cabins() {
  useEffect(function () {
    getCabins().then((data) => console.log(data));
  }, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img src="https://djbuiifvrzkksfdlasrl.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2024-03-28T03%3A07%3A50.659Z" />
    </Row>
  );
}

export default Cabins;
