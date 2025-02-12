import HorsesList from "../components/HorsesList";

const Home = ({ user }) => {
  return (
    <div>
    
        <HorsesList user={user} />
    </div>
  );
};

export default Home;
