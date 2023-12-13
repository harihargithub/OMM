import { useState } from 'react';
import MoviesList from './movie-list/MoviesList';
import TabOptions from '../utils/TabOptions';
import 'bootstrap/dist/css/bootstrap.min.css';

const tabOptions = {
  [TabOptions.MOVIES_IN_THEATERS]: TabOptions.MOVIES_IN_THEATERS,
  [TabOptions.COMING_SOON]: TabOptions.COMING_SOON,
  [TabOptions.TOP_RATED_INDIAN]: TabOptions.TOP_RATED_INDIAN,
  [TabOptions.TOP_RATED_MOVIES]: TabOptions.TOP_RATED_MOVIES,
  [TabOptions.FAVOURITES]: TabOptions.FAVOURITES,
};

type Tab = keyof typeof tabOptions;

function Home() {
  const [tab, setTab] = useState<TabOptions>(TabOptions.MOVIES_IN_THEATERS);

  return (
    <div
      className="d-flex"
      style={{
        overflow: 'visible',
        minHeight: '100vh',
        paddingTop: '3px',
        marginTop: '0px',
      }}
    >
      <div
        className="d-flex flex-column bg-warning p-3 sticky-sidebar"
        style={{ marginTop: '0px' }}
      >
        {Object.keys(tabOptions).map((tabKey) => (
          <button
            key={tabKey}
            className={`btn btn-primary mb-2 ${tabKey === tab ? 'active' : ''}`}
            onClick={() => setTab(tabKey as Tab)}
          >
            {tabKey}
          </button>
        ))}
      </div>

      <div className="flex-grow-1">
        <h2 className="bg-primary text-center custom-font">
          🎬 Entertainment, Your Way!🍿
        </h2>
        <MoviesList tab={tab} tabname={tabOptions[tab]} />
      </div>
    </div>
  );
}

export default Home;
