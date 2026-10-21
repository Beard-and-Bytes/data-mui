import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FaIcon } from '../common/FaIcon';
import { countryPath } from '../../routes';

type Props = {
  cca3: string;
};

export const ViewCountryButton = ({ cca3 }: Props) => {
  const navigate = useNavigate();
  return (
    <IconButton
      size="small"
      aria-label={`View ${cca3}`}
      onClick={() => void navigate(countryPath(cca3))}
    >
      <FaIcon icon={faArrowRight} size="sm" />
    </IconButton>
  );
};
