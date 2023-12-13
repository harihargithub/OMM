import { Spinner } from 'react-bootstrap';

type Props = {
  size?: 'small' | 'medium' | 'large';
  message?: string;
};

const sizeMap = {
  small: {
    width: '1.5rem',
    height: '1.5rem',
  },
  medium: {
    width: '2rem',
    height: '2rem',
  },
  large: {
    width: '4rem',
    height: '4rem',
  },
};

const LoadingIndicator = ({
  size = 'medium',
  message = 'Loading...',
}: Props) => {
  return (
    <div className="d-flex flex-column align-items-center my-4">
      <Spinner animation="grow" role="status" style={sizeMap[size]}>
        <span className="visually-hidden">{message}</span>
      </Spinner>
      <span className="my-2">{message}</span>
    </div>
  );
};

export default LoadingIndicator;
